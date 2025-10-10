import { UtilFecha } from "../utils/UtilFecha";
import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";
import { Contrato } from "../models/contrato.model";

const _Util_Fecha = new UtilFecha();

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

      result = await Contrato.findAndCountAll({
        where:
          filtro === 'id_contrato'
            ? { id_contrato: { [Op.eq]: busqueda } }
            : filtro === 'id_usuario'
              ? {
                [Op.or]: [
                  { id_usuario: { [Op.in]: busqueda } },
                  { id_usuario_contratista: { [Op.in]: busqueda } },
                  { id_usuario_supervisor: { [Op.in]: busqueda } },
                ],
              }
              : filtro === 'id_obra'
                ? { id_obra: { [Op.in]: busqueda } }
                : { [filtro]: busqueda },
        order: [['id_contrato', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
          },
          {
            model: Usuario,
            as: 'supervisor',
            attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
          },
          {
            model: Usuario,
            as: 'contratista',
            attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
          },
          {
            model: Obra,
            as: 'obra',
            attributes: ['calle']
          }
        ]
      });
    } else {
      result = await Contrato.findAndCountAll({
        order: [['id_contrato', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        }, {
          model: Usuario,
          as: 'supervisor',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        }, {
          model: Usuario,
          as: 'contratista',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        }, {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    }

    return {
      contratos: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarContrato(data: any) {
    const params = await data;
    const { id_obra, id_usuario_contratista, id_usuario_supervisor, costo_real, fecha_inicio, fecha_termino, usuario } = params;
    const { id_usuario } = usuario;
    const nueva_contrato = await Contrato.create({
      id_usuario,
      id_obra,
      id_usuario_contratista,
      id_usuario_supervisor,
      costo_real,
      fecha_inicio,
      fecha_termino,
    });

    const cointrato_recuperado = await Contrato.findByPk(nueva_contrato.id_contrato, {
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Usuario,
        as: 'supervisor',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Usuario,
        as: 'contratista',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      }]
    });

    return cointrato_recuperado;
  }

  public async actualizarContrato(data: any) {
    const params = await data;
    const { id_contrato, id_obra, id_usuario_supervisor, id_usuario_contratista, costo_real, fecha_inicio, fecha_termino, usuario } = params;
    const { id_usuario } = usuario;
    await Contrato.update({
      id_obra,
      id_usuario,
      id_usuario_supervisor,
      id_usuario_contratista,
      costo_real,
      fecha_inicio,
      fecha_termino
    }, { where: { id_contrato: id_contrato } });

    return `Contrato ${id_contrato} actualizado correctamente`;
  }

  public async eliminarContrato(data: any) {
    const params = await data;
    const { id_contrato } = params;
    await Contrato.update({
      estatus: 0
    }, { where: { id_contrato: id_contrato } });

    return `Contrato ${id_contrato} elimando logicamente correctamente`;
  }

  public async activarContrato(data: any) {
    const params = await data;
    const { id_contrato } = params;
    await Contrato.update({
      estatus: 1
    }, { where: { id_contrato: id_contrato } });

    return `Contrato ${id_contrato} activado logicamente correctamente`;
  }
}