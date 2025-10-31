import { Router } from 'express';
const api: Router = Router();

import { SolicitudInterface } from '../interfaces/solicitud.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Solicitud_Interface = new SolicitudInterface();

api.get('/',_Solicitud_Interface.obtenerSolicitudes);
api.post('/', _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Solicitud_Interface.agregarSolicitud);
api.put('/:id_solicitud',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Solicitud_Interface.actualizarSolicitud);
api.delete('/:id_solicitud',_Solicitud_Interface.eliminarSolicitud);
api.put('/activar/:id_solicitud',_Solicitud_Interface.activarSolicitud);

export default api;