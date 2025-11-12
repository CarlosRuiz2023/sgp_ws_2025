import { UtilFecha } from "../utils/UtilFecha";
import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";
import { Solicitud } from "../models/solicitud.model";
import { OficioSapal } from "../models/oficioSapal.model";

const _Util_Fecha = new UtilFecha();

export class OficioSapalController {

  public async obtenerOficios(data: any) {
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

      result = await OficioSapal.findAndCountAll({
        where:
          filtro === 'id_oficio_sapal'
            ? { id_oficio_sapal
              
              : { [Op.eq]: busqueda } }
            : filtro === 'id_usuario'
              ? {
                [Op.or]: [
                  { id_usuario: { [Op.in]: busqueda } },
                  { id_usuario_sapal: { [Op.in]: busqueda } },
                ],
              }
              : filtro === 'id_obra'
                ? { id_obra: { [Op.in]: busqueda } }
                : { [filtro]: busqueda },
        order: [['fecha_de_entrega', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'empleado_sapal',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    } else {
      result = await OficioSapal.findAndCountAll({
        order: [['fecha_de_entrega', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'empleado_sapal',
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
      oficios_sapal: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarOficioSapal(data: any) {
    const params = await data;
    const { id_obra, usuario, id_usuario_sapal } = params;
    const { id_usuario } = usuario;
    const nuevo_oficio_sapal = await OficioSapal.create({
      id_obra,
      id_usuario,
      id_usuario_sapal,
      fecha_de_entrega: _Util_Fecha.DateNow(),
    });

    const oficio_sapal_recuperado = await OficioSapal.findByPk(nuevo_oficio_sapal.id_oficio_sapal, {
      include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Usuario,
          as: 'empleado_sapal',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
    });

    return oficio_sapal_recuperado;
  }

  public async actualizarOficioSapal(data: any) {
    const params = await data;
    const { id_oficio_sapal, id_obra, id_usuario_sapal, usuario, observaciones=null } = params;
    const { id_usuario } = usuario;
    await OficioSapal.update({
      id_obra,
      id_usuario,
      id_usuario_sapal,
      observaciones
    }, { where: { id_oficio_sapal } });

    return `Oficio sapal ${id_oficio_sapal} actualizado correctamente`;
  }

  public async eliminarOficioSapal(data: any) {
    const params = await data;
    const { id_oficio_sapal } = params;
    await OficioSapal.update({
      estatus: 0
    }, { where: { id_oficio_sapal } });

    return `Oficio sapal ${id_oficio_sapal} elimando logicamente correctamente`;
  }

  public async activarOficioSapal(data: any) {
    const params = await data;
    const { id_oficio_sapal } = params;
    await OficioSapal.update({
      estatus: 1
    }, { where: { id_oficio_sapal } });

    return `Oficio sapal ${id_oficio_sapal} activado logicamente correctamente`;
  }
}