import { Router } from 'express';
const api: Router = Router();

import { ContratoInterface } from '../interfaces/contrato.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Contrato_Interface = new ContratoInterface();

api.get('/',_Contrato_Interface.obtenerContratos);
api.post('/', _UTIL_JWT.comprobarJWT.bind(_UTIL_JWT), _Contrato_Interface.agregarContrato);
api.put('/:id_contrato',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Contrato_Interface.actualizarContrato);
api.delete('/:id_contrato',_Contrato_Interface.eliminarContrato);
api.put('/activar/:id_contrato',_Contrato_Interface.activarContrato);

export default api;