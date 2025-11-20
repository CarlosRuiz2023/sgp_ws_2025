import { Router } from 'express';
const api: Router = Router();
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();

import { FirmaInterface } from '../interfaces/firma.interface';
const _Firma_Interface = new FirmaInterface();

api.get('/',_Firma_Interface.obtenerFirmas);
api.post('/',_Firma_Interface.agregarFirma);
api.put('/:id_firma',_Firma_Interface.actualizarFirma);
api.delete('/:id_firma',_Firma_Interface.eliminarFirma);
api.put('/activar/:id_firma',_Firma_Interface.activarFirma);

export default api;