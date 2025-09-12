import { Router } from 'express';
const api: Router = Router();

import { EmpresaInterface } from '../interfaces/empresa.interface';
const _Empresa_Interface = new EmpresaInterface();

api.get('/',_Empresa_Interface.obtenerEmpresas);
api.get('/:id_empresa',_Empresa_Interface.obtenerEmpresa);

export default api;