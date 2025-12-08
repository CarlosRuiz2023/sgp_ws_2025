import { Router } from 'express';
const api: Router = Router();

import { UtilJwt } from '../utils/UtilJwt';
import { OficioSapalInterface } from '../interfaces/oficioSapal.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';
import { OficioSapalMiddleware } from '../middleware/oficio_sapal.middleware';

const _UTIL_JWT = new UtilJwt();
const _Oficio_Sapal_Middleware = new OficioSapalMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Oficio_Sapal_Interface = new OficioSapalInterface();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Oficio_Sapal_Interface.obtenerOficios);
api.post('/',_Obra_Middleware.validar_id_obra, _Oficio_Sapal_Middleware.validar_id_usuario_sapal, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Oficio_Sapal_Interface.agregarOficioSapal);
api.put('/:id_oficio_sapal',_Oficio_Sapal_Middleware.validar_id_oficio_sapal,_Obra_Middleware.validar_id_obra, _Oficio_Sapal_Middleware.validar_id_usuario_sapal,_Oficio_Sapal_Middleware.validar_observaciones, _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Oficio_Sapal_Interface.actualizarOficioSapal);
api.delete('/:id_oficio_sapal',_Oficio_Sapal_Middleware.validar_id_oficio_sapal,_Oficio_Sapal_Interface.eliminarOficioSapal);
api.put('/activar/:id_oficio_sapal',_Oficio_Sapal_Middleware.validar_id_oficio_sapal_inactivo,_Oficio_Sapal_Interface.activarOficioSapal);

export default api;