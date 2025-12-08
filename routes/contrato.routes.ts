import { Router } from 'express';
const api: Router = Router();

import { ContratoInterface } from '../interfaces/contrato.interface';
import { UtilJwt } from '../utils/UtilJwt';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ContratoMiddleware } from '../middleware/contrato.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';

const _UTIL_JWT = new UtilJwt();
const _Contrato_Interface = new ContratoInterface();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Contrato_Middleware = new ContratoMiddleware();
const _Obra_Middleware = new ObraMiddleware();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Contrato_Interface.obtenerContratos);
api.post('/',_Obra_Middleware.validar_id_obra, _Contrato_Middleware.validar_id_usuario_contratista, _Contrato_Middleware.validar_id_usuario_supervisor, _Contrato_Middleware.validar_costo_real, _Contrato_Middleware.validar_fechas, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Contrato_Interface.agregarContrato);
api.put('/:id_contrato',_Contrato_Middleware.validar_id_contrato,_Obra_Middleware.validar_id_obra, _Contrato_Middleware.validar_id_usuario_contratista, _Contrato_Middleware.validar_id_usuario_supervisor, _Contrato_Middleware.validar_costo_real, _Contrato_Middleware.validar_fechas,_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Contrato_Interface.actualizarContrato);
api.delete('/:id_contrato',_Contrato_Middleware.validar_id_contrato,_Contrato_Interface.eliminarContrato);
api.put('/activar/:id_contrato',_Contrato_Middleware.validar_id_contrato_inactivo,_Contrato_Interface.activarContrato);

export default api;