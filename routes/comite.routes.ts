import { Router } from 'express';
const api: Router = Router();

import { ComiteInterface } from '../interfaces/comite.interface';
import { UtilJwt } from '../utils/UtilJwt';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ComiteMiddleware } from '../middleware/comite.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';

const _UTIL_JWT = new UtilJwt();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Comite_Interface = new ComiteInterface();
const _Comite_Middleware = new ComiteMiddleware();
const _Obra_Middleware = new ObraMiddleware();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Comite_Interface.obtenerComites);
api.get('/:id_comite',_Comite_Middleware.validar_id_comite,_Comite_Interface.obtenerComite);
api.post('/',_Obra_Middleware.validar_id_obra, _Comite_Middleware.validar_tipo, _Comite_Middleware.validar_punto, _Comite_Middleware.validar_costo,_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Comite_Interface.agregarComite);
api.delete('/:id_comite',_Comite_Middleware.validar_id_comite,_Comite_Interface.eliminarComite);
api.put('/activar/:id_comite',_Comite_Middleware.validar_id_comite_inactivo,_Comite_Interface.activarComite);

export default api;