import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.model";
import { UtilJwt } from "../utils/UtilJwt";
import { Acceso } from "../models/acceso.model";
import { Op } from "sequelize";
import { UtilFecha } from "../utils/UtilFecha";

const _Util_Jwt = new UtilJwt();
const _Util_Fecha = new UtilFecha();

export class AuthController {

  public async loguearUsuario(data: any) {
    const params = await data;
    const { correo, contrasenia } = params;
    const usuario = await Usuario.findOne({ where: { correo } });
    const { id_usuario, contrasenia: contrasenia_recupearada, estatus, token: token_recuperado } = usuario;
    const result = await Acceso.findAll({
      where: {
        id_usuario, exitoso: false, fecha_hora: {
          [Op.gte]: _Util_Fecha.Teen_minutes_before()
        }
      }
    });
    if(result.length > 4){
      return "Usted ha alcanzado el limite de intetos pruebe dentro de 10 mins.";
    }
    if (estatus != 1) {
      return "El Usuario se encuentra deshabilidado";
    }
    if (token_recuperado != null) {
      return "El Usuario ya se encuentra logueado";
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(contrasenia, contrasenia_recupearada);
    if (!validPassword) {
      const result = await Acceso.create({
        id_usuario,
        fecha_hora: _Util_Fecha.DateNow(),
        exitoso: false
      });
      return "Usuario / Password no son correctos - password";
    }
    // Generar el JWT
    const token = await _Util_Jwt.generarJWT(id_usuario);
    const result1 = await Usuario.update({
      token
    }, { where: { id_usuario } });
    const result2 = await Acceso.create({
      id_usuario,
      fecha_hora: _Util_Fecha.DateNow(),
      exitoso: true
    });
    const usuario_logueado = await Usuario.findOne({ where: { correo } });
    return usuario_logueado;
  }

  public async desloguearUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    const result = await Usuario.update({
      token: null
    }, { where: { id_usuario } });
    return `Usuario ${id_usuario} deslogueado correctamente`;
  }
}