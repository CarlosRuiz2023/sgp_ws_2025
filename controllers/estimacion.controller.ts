import { UtilFecha } from "../utils/UtilFecha";
import { Estimacion } from "../models/estimacion.model";
import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";

const _Util_Fecha = new UtilFecha();

export class EstimacionController {

  public async obtenerEstimacion(data: any) {
    const params = await data;
    const { id_estimacion } = params;
    const estimacion = await Estimacion.findByPk(id_estimacion, {
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      }]
    });
    return estimacion;
  }

  public async obtenerEstimaciones(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
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

      result = await Estimacion.findAndCountAll({
        where: {
          [filtro]: filtro === 'id_obra'
            ? { [Op.in]: busqueda }             // arreglo de ids
            : busqueda,                         // coincidencia exacta
        },
        order: [['fecha_creacion', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        }, {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    } else {
      result = await Estimacion.findAndCountAll({
        order: [['fecha_creacion', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        }, {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    }

    return {
      estimaciones: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarEstimacion(data: any) {
    const params = await data;
    const { id_obra, finiquito, avance_fisico, avance_financiero, actual, anterior, usuario } = params;
    const { id_usuario } = usuario;
    const nueva_estimacion = await Estimacion.create({
      id_usuario,
      id_obra,
      finiquito,
      avance_fisico,
      avance_financiero,
      actual,
      anterior,
      fecha_creacion: _Util_Fecha.DateNow(),
    });

    const estimacion_recuperada = await Estimacion.findByPk(nueva_estimacion.id_estimacion, {
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      }]
    });

    return estimacion_recuperada;
  }

  public async actualizarEstimacion(data: any) {
    const params = await data;
    const { id_estimacion, id_obra, finiquito, avance_fisico, avance_financiero, actual, anterior, usuario } = params;
    const { id_usuario } = usuario;
    await Estimacion.update({
      id_obra,
      finiquito,
      avance_fisico,
      avance_financiero,
      actual,
      anterior,
      id_usuario
    }, { where: { id_estimacion } });

    return `Estimacion ${id_estimacion} actualizada correctamente`;
  }

  public async eliminarEstimacion(data: any) {
    const params = await data;
    const { id_estimacion } = params;
    await Estimacion.update({
      estatus: 0
    }, { where: { id_estimacion } });

    return `Estimacion ${id_estimacion} elimanda logicamente correctamente`;
  }

  public async activarEstimacion(data: any) {
    const params = await data;
    const { id_estimacion } = params;
    await Estimacion.update({
      estatus: 1
    }, { where: { id_estimacion } });

    return `Estimacion ${id_estimacion} activada logicamente correctamente`;
  }
}