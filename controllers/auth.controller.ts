import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.model";
import { UtilJwt } from "../utils/UtilJwt";
import { Acceso } from "../models/acceso.model";
import { Op } from "sequelize";
import { UtilFecha } from "../utils/UtilFecha";
import { ModuloPermiso } from "../models/modulo_permiso.model";
import { Modulo } from "../models/modulo.model";
import { Permiso } from "../models/permiso.model";
import { Rol } from "../models/rol.model";

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
        id_usuario, exitoso: false,
        fecha_hora: { [Op.gte]: _Util_Fecha.Teen_minutes_before() }
      }
    });

    if (result.length > 4) {
      return "Usted ha alcanzado el limite de intetos pruebe dentro de 10 mins.";
    }

    if (estatus != 1) {
      return "El Usuario se encuentra deshabilidado";
    }

    if (token_recuperado != null) {
      return "El Usuario ya se encuentra logueado";
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync(contrasenia, contrasenia_recupearada);
    if (!validPassword) {
      await Acceso.create({
        id_usuario,
        fecha_hora: _Util_Fecha.DateNow(),
        exitoso: false
      });
      return "Usuario / Password no son correctos - password";
    }

    // Generar JWT
    const token = await _Util_Jwt.generarJWT(id_usuario);

    await Usuario.update({ token }, { where: { id_usuario } });

    await Acceso.create({
      id_usuario,
      fecha_hora: _Util_Fecha.DateNow(),
      exitoso: true
    });

    const usuario_logueado = await Usuario.findOne({ where: { correo } });

    // ===================================================================================
    // OBTENER PERMISOS
    // ===================================================================================

    const permisos_raw = await ModuloPermiso.findAll({
      where: { id_rol: usuario_logueado.id_rol },
      include: [
        {
          model: Modulo,
          as: "modulo",
          attributes: ["modulo"]
        },
        {
          model: Permiso,
          as: "permiso",
          attributes: ["permiso"]
        },
        {
          model: Rol,
          as: "rol",
          attributes: ["rol"]
        }
      ]
    });

    // ===================================================================================
    // TRANSFORMAR ESTRUCTURA → { "Obras": ["Consultar", "Agregar"] }
    // ===================================================================================

    const permisos_por_modulo: any = {};

    permisos_raw.forEach((item: any) => {
      const nombre_modulo = item.modulo.modulo;
      const permiso = item.permiso.permiso;

      // Si no existe el módulo, lo creamos
      if (!permisos_por_modulo[nombre_modulo]) {
        permisos_por_modulo[nombre_modulo] = [];
      }

      // Insertar el permiso
      permisos_por_modulo[nombre_modulo].push(permiso);
    });

    // ===================================================================================
    // RESPUESTA FINAL
    // ===================================================================================

    return {
      Usuario: usuario_logueado,
      permisos_por_modulo
    };
  }


  public async desloguearUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    await Usuario.update({
      token: null
    }, { where: { id_usuario } });
    return `Usuario ${id_usuario} deslogueado correctamente`;
  }

  public async desloguearUsuarioToken(data: any) {
    const params = await data;
    const { usuario } = params;
    const { id_usuario } = usuario;
    await Usuario.update({
      token: null
    }, { where: { id_usuario } });
    return `Usuario ${id_usuario} deslogueado correctamente`;
  }

  public async checkStatus(data: any) {
    const params = await data;
    const { usuario } = params;
    const { id_usuario } = usuario;
    // si quieres renovar token
    const token = _Util_Jwt.generarJWT(id_usuario);
    await Usuario.update({
      token
    }, { where: { id_usuario } });
    const usuario_logueado = await Usuario.findByPk(id_usuario);

    return {
      token,
      Usuario: usuario_logueado  // <-- info del usuario
    };
  }
}