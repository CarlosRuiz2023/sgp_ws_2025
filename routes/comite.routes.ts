import { Router } from 'express';
const api: Router = Router();

import { ComiteInterface } from '../interfaces/comite.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Comite_Interface = new ComiteInterface();

api.get('/',_Comite_Interface.obtenerComites);
api.get('/:id_comite',_Comite_Interface.obtenerComite);
api.post('/', _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Comite_Interface.agregarComite);
//api.put('/:id_obra',_Comite_Interface.actualizarObra);
api.delete('/:id_comite',_Comite_Interface.eliminarComite);
api.put('/activar/:id_comite',_Comite_Interface.activarComite);

export default api;