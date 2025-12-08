import { Router } from 'express';
const api: Router = Router();

import { UtilJwt } from '../utils/UtilJwt';
import { SolicitudInterface } from '../interfaces/solicitud.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';
import { SolicitudMiddleware } from '../middleware/solicitud.middleware';

const _Solicitud_Middleware = new SolicitudMiddleware();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _UTIL_JWT = new UtilJwt();
const _Solicitud_Interface = new SolicitudInterface();

api.get('/', _Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset, _Busqueda_Middleware.validar_filtro, _Busqueda_Middleware.validar_busqueda, _Solicitud_Interface.obtenerSolicitudes);
api.post('/', _Obra_Middleware.validar_id_obra, _Solicitud_Middleware.validar_id_usuario_solicitud, _Solicitud_Middleware.validar_id_usuario_laboratorio, _Solicitud_Middleware.validar_id_usuario_ms, _Solicitud_Middleware.validar_fecha, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Solicitud_Interface.agregarSolicitud);
api.put('/:id_solicitud', _Solicitud_Middleware.validar_id_solicitud, _Obra_Middleware.validar_id_obra, _Solicitud_Middleware.validar_id_usuario_laboratorio, _Solicitud_Middleware.validar_id_usuario_ms, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Solicitud_Interface.actualizarSolicitud);
api.delete('/:id_solicitud', _Solicitud_Middleware.validar_id_solicitud, _Solicitud_Interface.eliminarSolicitud);
api.put('/activar/:id_solicitud', _Solicitud_Middleware.validar_id_solicitud_inactiva, _Solicitud_Interface.activarSolicitud);

export default api;