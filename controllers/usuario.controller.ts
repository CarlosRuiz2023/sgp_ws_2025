import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.model";

export class UsuarioController {

  public async obtenerUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    const usuario = await Usuario.findByPk(id_usuario);
    return usuario;
  }

  public async obtenerUsuarios() {
    const usuarios = await Usuario.findAll({where:{estatus:1}});
    return usuarios;
  }

  public async agregarUsuario(data: any) {
    const params = await data;
    const { id_rol, id_empresa, nombres, apellido_paterno, apellido_materno, correo, contrasenia } = params;
    const salt = bcryptjs.genSaltSync();
    const contrasenia_encriptada = bcryptjs.hashSync(contrasenia, salt);
    const nuevo_usuario = await Usuario.create({
      id_rol,
      id_empresa,
      nombres,
      apellido_paterno,
      apellido_materno,
      correo,
      contrasenia: contrasenia_encriptada,
      contrasenia_visible: contrasenia
    });
    return nuevo_usuario;
  }

  public async actualizarUsuario(data: any) {
    const params = await data;
    const { id_usuario, id_rol, id_empresa, nombres, apellido_paterno, apellido_materno, correo } = params;
    const result = await Usuario.update({
      id_rol,
      id_empresa,
      nombres,
      apellido_paterno,
      apellido_materno,
      correo,
    }, { where: { id_usuario } });

    return `Usuario ${id_usuario} actualizado correctamente`;
  }

  public async actualizarContrasenia(data: any) {
    const params = await data;
    const { id_usuario, contrasenia } = params;
    const salt = bcryptjs.genSaltSync();
    const contrasenia_encriptada = bcryptjs.hashSync(contrasenia, salt);
    const result = await Usuario.update({
      contrasenia: contrasenia_encriptada,
      contrasenia_visible: contrasenia
    }, { where: { id_usuario } });

    return `Contraseña del usuario ${id_usuario} actualizada correctamente`;
  }

  public async eliminarUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    await Usuario.update({
      estatus:0
    }, { where: { id_usuario } });

    return `Contraseña del usuario ${id_usuario} actualizada correctamente`;
  }

  public async activarUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    await Usuario.update({
      estatus:1
    }, { where: { id_usuario } });

    return `Contraseña del usuario ${id_usuario} actualizada correctamente`;
  }
}