import { Router } from 'express';
const api: Router = Router();
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();

import { EstimacionInterface } from '../interfaces/estimacion.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { EstimacionMiddleware } from '../middleware/estimacion.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';

const _Busqueda_Middleware = new BusquedaMiddleware();
const _Estimacion_Middleware = new EstimacionMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _Estimacion_Interface = new EstimacionInterface();

api.get('/', _Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda, _Estimacion_Interface.obtenerEstimaciones);
api.get('/:id_estimacion',_Estimacion_Middleware.validar_id_estimacion, _Estimacion_Interface.obtenerEstimacion);
api.post('/',_Obra_Middleware.validar_id_obra,_Estimacion_Middleware.validar_finiquito, _Estimacion_Middleware.validar_avance_fisico, _Estimacion_Middleware.validar_avance_financiero, _Estimacion_Middleware.validar_monto_estimado_actual, _Estimacion_Middleware.validar_monto_estimado_anterior, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Estimacion_Interface.agregarEstimacion);
api.put('/:id_estimacion',_Estimacion_Middleware.validar_id_estimacion,_Obra_Middleware.validar_id_obra,_Estimacion_Middleware.validar_finiquito, _Estimacion_Middleware.validar_avance_fisico, _Estimacion_Middleware.validar_avance_financiero, _Estimacion_Middleware.validar_monto_estimado_actual, _Estimacion_Middleware.validar_monto_estimado_anterior, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Estimacion_Interface.actualizarEstimacion);
api.delete('/:id_estimacion',_Estimacion_Middleware.validar_id_estimacion, _Estimacion_Interface.eliminarEstimacion);
api.put('/activar/:id_estimacion',_Estimacion_Middleware.validar_id_estimacion_inactiva,_Estimacion_Interface.activarEstimacion);

export default api;