import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";
import { Entrega } from "../models/entrega.model";
import { EmailController } from "../controllers/email.controller";

const _EMAIL_CONTROLLER = new EmailController();

export class EntregaController {

  public async obtenerEntregas(data: any) {
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

      result = await Entrega.findAndCountAll({
        where:
          filtro === 'id_entrega'
            ? { id_entrega
              
              : { [Op.eq]: busqueda } }
            : filtro === 'id_usuario'
              ? {
                [Op.or]: [
                  { id_usuario_fisico: { [Op.in]: busqueda } },
                  { id_usuario_administrativo: { [Op.in]: busqueda } },
                ],
              }
              : filtro === 'id_obra'
                ? { id_obra: { [Op.in]: busqueda } }
                : { [filtro]: busqueda },
        order: [['fecha_fisica', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'fisico',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'administrativo',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    } else {
      result = await Entrega.findAndCountAll({
        order: [['fecha_fisica', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'fisico',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'administrativo',
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
      entregas: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarEntrega(data: any) {
    const params = await data;
    const { id_obra, id_usuario_fisico, id_usuario_administrativo } = params;
    const nueva_entrega = await Entrega.create({
      id_obra,
      id_usuario_fisico,
      id_usuario_administrativo,
    });

    const entrega_recuperada = await Entrega.findByPk(nueva_entrega.id_entrega, {
      include: [{
          model: Usuario,
          as: 'fisico',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'administrativo',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
    });

    const fisico = await Usuario.findByPk(id_usuario_fisico);
    const { correo: correo_fisico } = fisico;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_fisico,
      "titulo": "Entrega asignada",
      "mensaje": "Tienes una nueva entrega pendiente en el sistema. Por favor revisa los detalles.",
      "botonTexto": "Ver entrega",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });
    const administrativo = await Usuario.findByPk(id_usuario_administrativo);
    const { correo: correo_administrativo } = administrativo;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_administrativo,
      "titulo": "Entrega asignada",
      "mensaje": "Tienes una nueva entrega pendiente en el sistema. Por favor revisa los detalles.",
      "botonTexto": "Ver entrega",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });

    return entrega_recuperada;
  }

  public async actualizarEntrega(data: any) {
    const params = await data;
    const { id_entrega, id_obra, id_usuario_fisico, id_usuario_administrativo } = params;
    await Entrega.update({
      id_obra,
      id_usuario_fisico,
      id_usuario_administrativo,
    }, { where: { id_entrega } });

    const fisico = await Usuario.findByPk(id_usuario_fisico);
    const { correo: correo_fisico } = fisico;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_fisico,
      "titulo": "Entrega asignada",
      "mensaje": `Tienes una actualizacion dentro de la entrega ${id_entrega} pendiente en el sistema. Por favor revisa los detalles.`,
      "botonTexto": "Ver entrega",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });
    const administrativo = await Usuario.findByPk(id_usuario_administrativo);
    const { correo: correo_administrativo } = administrativo;
    await _EMAIL_CONTROLLER.enviarCorreoInformativo({
      "correo": correo_administrativo,
      "titulo": "Entrega asignada",
      "mensaje": `Tienes una actualizacion dentro de la entrega ${id_entrega} pendiente en el sistema. Por favor revisa los detalles.`,
      "botonTexto": "Ver entrega",
      "botonUrl": global.ENVGLOBAL?.IP || 'http://localhost:4200'+"/auth/login",
    });

    return `Entrega ${id_entrega} actualizada correctamente`;
  }

  public async eliminarEntrega(data: any) {
    const params = await data;
    const { id_entrega } = params;
    await Entrega.update({
      estatus: 0
    }, { where: { id_entrega: id_entrega } });

    return `Entrega ${id_entrega} elimanda logicamente correctamente`;
  }

  public async activarEntrega(data: any) {
    const params = await data;
    const { id_entrega } = params;
    await Entrega.update({
      estatus: 1
    }, { where: { id_entrega } });

    return `Entrega ${id_entrega} activada logicamente correctamente`;
  }
}