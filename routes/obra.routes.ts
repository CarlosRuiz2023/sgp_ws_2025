import { Router } from 'express';
const api: Router = Router();
import { ObraInterface } from '../interfaces/obra.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';
import { ColoniaMiddleware } from '../middleware/colonia.middleware';

const _Busqueda_Middleware = new BusquedaMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _Colonia_Middleware = new ColoniaMiddleware();
const _Obra_Interface = new ObraInterface();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Obra_Interface.obtenerObras);
api.get('/:id_obra',_Obra_Middleware.validar_id_obra, _Obra_Interface.obtenerObra);
api.post('/',_Colonia_Middleware.validar_id_colonia,_Obra_Middleware.validar_calle, _Obra_Middleware.validar_tramo,_Obra_Interface.agregarObra);
api.put('/:id_obra',_Obra_Middleware.validar_id_obra,_Colonia_Middleware.validar_id_colonia,_Obra_Middleware.validar_calle, _Obra_Middleware.validar_tramo,_Obra_Interface.actualizarObra);
api.delete('/:id_obra',_Obra_Middleware.validar_id_obra,_Obra_Interface.eliminarObra);
api.put('/activar/:id_obra',_Obra_Middleware.validar_id_obra_inactiva,_Obra_Interface.activarObra);

export default api;