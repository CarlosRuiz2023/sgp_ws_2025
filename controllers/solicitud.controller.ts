import { UtilFecha } from "../utils/UtilFecha";
import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";
import { Solicitud } from "../models/solicitud.model";
import { EmailController } from "../controllers/email.controller";

const _Util_Fecha = new UtilFecha();
const _EMAIL_CONTROLLER = new EmailController();

export class SolicitudController {

  public async obtenerSolicitudes(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
      if (filtro === 'id_usuario') {
        const usuario = await Usuario.findAll({
          where: where(
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
        });
        busqueda = usuario.map((u: any) => u.id_usuario);
      }
      if (filtro === 'id_obra') {
        const obra = await Obra.findAll({
          where: where(
            fn("unaccent", col("calle")),
            {
              [Op.iLike]: `%${busqueda}%`  // iLike = case-insensitive
            }
          )
        });
        busqueda = [];
        for (let index = 0; index < obra.length; index++) {
          const { id_obra } = obra[index];
          busqueda.push(id_obra);
        }
      }

      result = await Solicitud.findAndCountAll({
        where:
          filtro === 'id_solicitud'
            ? {
              id_solicitud

                : { [Op.eq]: busqueda }
            }
            : filtro === 'id_usuario'
              ? {
                [Op.or]: [
                  { id_usuario_solicitud: { [Op.in]: busqueda } },
                  { id_usuario_laboratorio: { [Op.in]: busqueda } },
                  { id_usuario_ms: { [Op.in]: busqueda } },
                ],
              }
              : filtro === 'id_obra'
                ? { id_obra: { [Op.in]: busqueda } }
                : { [filtro]: busqueda },
        order: [['fecha_solicitud', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'solicitante',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'laboratorista',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'mecanico_de_suelos',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    } else {
      result = await Solicitud.findAndCountAll({
        order: [['fecha_solicitud', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'solicitante',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'laboratorista',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'mecanico_de_suelos',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    }

    return {
      solicitudes: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarSolicitud(data: any) {
    const params = await data;
    const { id_obra, usuario, id_usuario_laboratorio, id_usuario_ms } = params;
    const { id_usuario: id_usuario_solicitud } = usuario;
    const nueva_solicitud = await Solicitud.create({
      id_obra,
      id_usuario_solicitud,
      id_usuario_laboratorio,
      id_usuario_ms,
      fecha_solicitud: _Util_Fecha.DateNow(),
    });

    const solicitud_recuperada = await Solicitud.findByPk(nueva_solicitud.id_solicitud, {
      include: [{
        model: Usuario,
        as: 'solicitante',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      },
      {
        model: Usuario,
        as: 'laboratorista',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      },
      {
        model: Usuario,
        as: 'mecanico_de_suelos',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      },
      {
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      }]
    });

    const laboratorista = await Usuario.findByPk(id_usuario_laboratorio);
    const { correo: correo_laboratorista } = laboratorista;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_laboratorista,
      "titulo": "Solicitud asignada",
      "mensaje": "Tienes una nueva solicitud pendiente en el sistema. Por favor revisa los detalles.",
      "botonTexto": "Ver solicitud",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });
    const mecanico_de_suelos = await Usuario.findByPk(id_usuario_ms);
    const { correo: correo_ms } = mecanico_de_suelos;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_ms,
      "titulo": "Solicitud asignada",
      "mensaje": "Tienes una nueva solicitud pendiente en el sistema. Por favor revisa los detalles.",
      "botonTexto": "Ver solicitud",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });

    return solicitud_recuperada;
  }

  public async actualizarSolicitud(data: any) {
    const params = await data;
    const { id_solicitud, id_obra, id_usuario_laboratorio, id_usuario_ms, usuario } = params;
    const { id_usuario } = usuario;
    await Solicitud.update({
      id_obra,
      id_usuario_solicitud: id_usuario,
      id_usuario_laboratorio,
      id_usuario_ms
    }, { where: { id_solicitud } });

    const laboratorista = await Usuario.findByPk(id_usuario_laboratorio);
    const { correo: correo_laboratorista } = laboratorista;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_laboratorista,
      "titulo": "Solicitud asignada",
      "mensaje": `Tienes una actualizacion dentro de la solicitud ${id_solicitud} pendiente en el sistema. Por favor revisa los detalles.`,
      "botonTexto": "Ver solicitud",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });
    const mecanico_de_suelos = await Usuario.findByPk(id_usuario_ms);
    const { correo: correo_ms } = mecanico_de_suelos;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_ms,
      "titulo": "Solicitud asignada",
      "mensaje": `Tienes una actualizacion dentro de la solicitud ${id_solicitud} pendiente en el sistema. Por favor revisa los detalles.`,
      "botonTexto": "Ver solicitud",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });

    return `Solicitud ${id_solicitud} actualizada correctamente`;
  }

  public async eliminarSolicitud(data: any) {
    const params = await data;
    const { id_solicitud } = params;
    await Solicitud.update({
      estatus: 0
    }, { where: { id_solicitud } });

    return `Solicitud ${id_solicitud} elimanda logicamente correctamente`;
  }

  public async activarSolicitud(data: any) {
    const params = await data;
    const { id_solicitud } = params;
    await Solicitud.update({
      estatus: 1
    }, { where: { id_solicitud } });

    return `Solicitud ${id_solicitud} activada logicamente correctamente`;
  }
}