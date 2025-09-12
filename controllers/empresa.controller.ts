import { Empresa } from "../models/empresa.model";

export class EmpresaController {

  public async obtenerEmpresa(data: any) {
    const params = await data;
    const { id_empresa } = params;
    const empresa = await Empresa.findByPk(id_empresa, { where: { estatus: 1 } });
    return empresa;
  }

  public async obtenerEmpresas() {
    const empresas = await Empresa.findAndCountAll({ where: { estatus: 1 }, order: [['empresa', 'ASC']] });
    return { empresas };
  }
}