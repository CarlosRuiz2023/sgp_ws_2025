import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.model";
import { Rol } from "../models/rol.model";
import { Empresa } from "../models/empresa.model";
import { col, fn, Op, where } from "sequelize";

export class UsuarioController {

  public async obtenerUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    const usuario = await Usuario.findByPk(id_usuario, {
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['rol']
      },
      {
        model: Empresa,
        as: 'empresa',
        attributes: ['empresa']
      }]
    });
    return usuario;
  }

  public async obtenerUsuarios(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
      if (filtro === 'id_rol') {
        const rol = await Rol.findAll({
          where: where(
            fn("unaccent", col("rol")),
            {
              [Op.iLike]: `%${busqueda}%`  // iLike = case-insensitive
            }
          )
        });
        busqueda = [];
        for (let index = 0; index < rol.length; index++) {
          const { id_rol } = rol[index];
          busqueda.push(id_rol);
        }
      }
      if (filtro === 'id_empresa') {
        const empresa = await Empresa.findAll({
          where: where(
            fn("unaccent", col("empresa")),
            {
              [Op.iLike]: `%${busqueda}%`  // iLike = case-insensitive
            }
          )
        });
        busqueda = [];
        for (let index = 0; index < empresa.length; index++) {
          const { id_empresa } = empresa[index];
          busqueda.push(id_empresa);
        }
      }

      result = await Usuario.findAndCountAll({
        where: {
          [filtro]: filtro === 'nombre'
            ? where(
              fn(
                "unaccent",
                fn(
                  "concat",
                  col("apellido_paterno"),
                  " ",
                  col("apellido_materno"),
                  " ",
                  col("nombres")
                )
              ),
              {
                [Op.iLike]: `%${busqueda}%`
              }
            )     // búsquedas parciales
            : filtro === 'correo'
            ? where(
              fn(
                "unaccent",
                col("correo")
              ),
              {
                [Op.iLike]: `%${busqueda}%`
              }
            )     // búsquedas parciales
            : filtro === 'id_rol'
              ? { [Op.in]: busqueda }    
            : filtro === 'id_empresa'
              ? { [Op.in]: busqueda }           // arreglo de ids
              : busqueda,                         // coincidencia exacta
        },
        order: [['apellido_paterno', 'DESC']],
        limit,
        offset,
        include: [{
          model: Rol,
          as: 'rol',
          attributes: ['rol']
        },
        {
          model: Empresa,
          as: 'empresa',
          attributes: ['empresa']
        }]
      });
    } else {
      result = await Usuario.findAndCountAll({
        order: [['apellido_paterno', 'DESC']],
        limit,
        offset,
        include: [{
          model: Rol,
          as: 'rol',
          attributes: ['rol']
        },
        {
          model: Empresa,
          as: 'empresa',
          attributes: ['empresa']
        }]
      });
    }

    return {
      usuarios: result.rows,              // Lista de usuarios paginados
      total: result.count,             // Total de usuarios sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
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
      estatus: 0
    }, { where: { id_usuario } });

    return `Contraseña del usuario ${id_usuario} actualizada correctamente`;
  }

  public async activarUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    await Usuario.update({
      estatus: 1
    }, { where: { id_usuario } });

    return `Contraseña del usuario ${id_usuario} actualizada correctamente`;
  }
}