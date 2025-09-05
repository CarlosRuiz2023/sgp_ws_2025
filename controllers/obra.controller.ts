import { col, fn, Op, where } from "sequelize";
import { Colonia } from "../models/colonia.model";
import { Obra } from "../models/obra.model";

export class ObraController {

  public async obtenerObra(data: any) {
    const params = await data;
    const { id_obra } = params;
    const obra = await Obra.findByPk(id_obra, {
      include: [{
        model: Colonia,
        as: 'colonia',
        attributes: ['colonia']
      }]
    });
    return obra;
  }

  public async obtenerObras(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
      if (filtro === 'id_colonia') {
        const colonia = await Colonia.findAll({
          where: where(
            fn("unaccent", col("colonia")),
            {
              [Op.iLike]: `%${busqueda}%`  // iLike = case-insensitive
            }
          )
        });
        busqueda = [];
        for (let index = 0; index < colonia.length; index++) {
          const { id_colonia } = colonia[index];
          busqueda.push(id_colonia);
        }
      }

      result = await Obra.findAndCountAll({
        where: {
          [filtro]: filtro === 'calle'
            ? where(
              fn("unaccent", col("calle")),
              { [Op.iLike]: `%${busqueda}%` }   // insensible a mayúsculas y minúsculas
            )     // búsquedas parciales
            : filtro === 'id_colonia'
              ? { [Op.in]: busqueda }             // arreglo de ids
              : busqueda,                         // coincidencia exacta
        },
        order: [['id_obra', 'DESC']],
        limit,
        offset,
        include: [{
          model: Colonia,
          as: 'colonia',
          attributes: ['colonia']
        }]
      });
    } else {
      result = await Obra.findAndCountAll({
        order: [['id_obra', 'DESC']],
        limit,
        offset,
        include: [{
          model: Colonia,
          as: 'colonia',
          attributes: ['colonia']
        }]
      });
    }

    return {
      obras: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarObra(data: any) {
    const params = await data;
    const { id_colonia, calle, tramo } = params;
    const nueva_obra = await Obra.create({
      id_colonia,
      calle,
      tramo
    });

    const obra_recuperada = await Obra.findByPk(nueva_obra.id_obra, {
      include: [{
        model: Colonia,
        as: 'colonia',
        attributes: ['colonia']
      }]
    });

    return obra_recuperada;
  }

  public async actualizarObra(data: any) {
    const params = await data;
    const { id_obra, id_colonia, calle, traza_du, tramo, finiquito } = params;
    await Obra.update({
      id_colonia,
      calle,
      traza_du,
      tramo,
      finiquito
    }, { where: { id_obra } });

    return `Obra ${id_obra} actualizada correctamente`;
  }

  public async eliminarObra(data: any) {
    const params = await data;
    const { id_obra } = params;
    await Obra.update({
      estatus: 0
    }, { where: { id_obra } });

    return `Obra ${id_obra} elimanda logicamente correctamente`;
  }

  public async activarObra(data: any) {
    const params = await data;
    const { id_obra } = params;
    await Obra.update({
      estatus: 1
    }, { where: { id_obra } });

    return `Obra ${id_obra} activada logicamente correctamente`;
  }
}