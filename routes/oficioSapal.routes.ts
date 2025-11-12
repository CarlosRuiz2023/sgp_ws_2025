import { Router } from 'express';
const api: Router = Router();

import { OficioSapalInterface } from '../interfaces/oficioSapal.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Oficio_Sapal_Interface = new OficioSapalInterface();

api.get('/',_Oficio_Sapal_Interface.obtenerOficios);
api.post('/', _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Oficio_Sapal_Interface.agregarOficioSapal);
api.put('/:id_oficio_sapal',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Oficio_Sapal_Interface.actualizarOficioSapal);
api.delete('/:id_oficio_sapal',_Oficio_Sapal_Interface.eliminarOficioSapal);
api.put('/activar/:id_oficio_sapal',_Oficio_Sapal_Interface.activarOficioSapal);

export default api;