import { Router } from 'express';
const api: Router = Router();
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();

import { EstimacionInterface } from '../interfaces/estimacion.interface';
const _Estimacion_Interface = new EstimacionInterface();

api.get('/',_Estimacion_Interface.obtenerEstimaciones);
api.get('/:id_estimacion',_Estimacion_Interface.obtenerEstimacion);
api.post('/',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Estimacion_Interface.agregarEstimacion);
api.put('/:id_estimacion',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Estimacion_Interface.actualizarEstimacion);
api.delete('/:id_estimacion',_Estimacion_Interface.eliminarEstimacion);
api.put('/activar/:id_estimacion',_Estimacion_Interface.activarEstimacion);

export default api;