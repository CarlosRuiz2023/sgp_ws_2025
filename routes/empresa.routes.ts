import { Router } from 'express';
const api: Router = Router();

import { EmpresaInterface } from '../interfaces/empresa.interface';
import { EmpresaMiddleware } from '../middleware/empresa.middleware';

const _Empresa_Interface = new EmpresaInterface();
const _Empresa_Middleware = new EmpresaMiddleware();

api.get('/',_Empresa_Interface.obtenerEmpresas);
api.get('/:id_empresa',_Empresa_Middleware.validar_id_empresa,_Empresa_Interface.obtenerEmpresa);

export default api;