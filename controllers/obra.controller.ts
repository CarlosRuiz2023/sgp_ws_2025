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

    const result = await Obra.findAndCountAll({
      where: { estatus: 1 },
      limit,
      offset,
      include: [{
        model: Colonia,
        as: 'colonia',
        attributes: ['colonia']
      }]
    });

    return {
      obras: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarObra(data: any) {
    const params = await data;
    const { id_colonia, calle, traza_du, tramo } = params;
    const nueva_obra = await Obra.create({
      id_colonia,
      calle,
      traza_du,
      tramo
    });
    return nueva_obra;
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