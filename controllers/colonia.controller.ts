import { Colonia } from "../models/colonia.model";

export class ColoniaController {

  public async obtenerColonia(data: any) {
    const params = await data;
    const { id_colonia } = params;
    const colonia = await Colonia.findByPk(id_colonia);
    return colonia;
  }

  public async obtenerColonias() {
    const colonias = await Colonia.findAndCountAll({order: [['colonia', 'ASC']]});
    return { colonias };
  }
}