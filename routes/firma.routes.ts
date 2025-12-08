import { Router } from 'express';
const api: Router = Router();
import { FirmaInterface } from '../interfaces/firma.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { ObraMiddleware } from '../middleware/obra.middleware';
import { UsuarioMiddleware } from '../middleware/usuario.middleware';
import { FirmaMiddleware } from '../middleware/firma.middleware';

const _Busqueda_Middleware = new BusquedaMiddleware();
const _Obra_Middleware = new ObraMiddleware();
const _Usuario_Middleware = new UsuarioMiddleware();
const _Firma_Middleware = new FirmaMiddleware();
const _Firma_Interface = new FirmaInterface();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Firma_Interface.obtenerFirmas);
api.post('/',_Obra_Middleware.validar_id_obra,_Usuario_Middleware.validar_id_usuario,_Firma_Interface.agregarFirma);
api.put('/:id_firma',_Firma_Middleware.validar_id_firma,_Obra_Middleware.validar_id_obra,_Usuario_Middleware.validar_id_usuario, _Firma_Interface.actualizarFirma);
api.delete('/:id_firma',_Firma_Middleware.validar_id_firma,_Firma_Interface.eliminarFirma);
api.put('/activar/:id_firma',_Firma_Middleware.validar_id_firma_inactiva,_Firma_Interface.activarFirma);

export default api;