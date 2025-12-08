import { Router } from 'express';
const api: Router = Router();

import { EntregaInterface } from '../interfaces/entrega.interface';
import { EntregaMiddleware } from '../middleware/entrega.middleware';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';

const _Entrega_Middleware = new EntregaMiddleware();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _Entrega_Interface = new EntregaInterface();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Entrega_Interface.obtenerEntregas);
api.post('/',_Obra_Middleware.validar_id_obra,_Entrega_Middleware.validar_id_usuario_fisico, _Entrega_Middleware.validar_id_usuario_administrativo, _Entrega_Interface.agregarEntrega);
api.put('/:id_entrega',_Entrega_Middleware.validar_id_entrega,_Obra_Middleware.validar_id_obra,_Entrega_Middleware.validar_id_usuario_fisico, _Entrega_Middleware.validar_id_usuario_administrativo, _Entrega_Interface.actualizarEntrega);
api.delete('/:id_entrega',_Entrega_Middleware.validar_id_entrega,_Entrega_Interface.eliminarEntrega);
api.put('/activar/:id_entrega',_Entrega_Middleware.validar_id_entrega_inactiva, _Entrega_Interface.activarEntrega);

export default api;