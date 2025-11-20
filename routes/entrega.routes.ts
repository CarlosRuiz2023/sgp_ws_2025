import { Router } from 'express';
const api: Router = Router();

import { EntregaInterface } from '../interfaces/entrega.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Entrega_Interface = new EntregaInterface();

api.get('/',_Entrega_Interface.obtenerEntregas);
api.post('/', _Entrega_Interface.agregarEntrega);
api.put('/:id_entrega',_Entrega_Interface.actualizarEntrega);
api.delete('/:id_entrega',_Entrega_Interface.eliminarEntrega);
api.put('/activar/:id_entrega',_Entrega_Interface.activarEntrega);

export default api;