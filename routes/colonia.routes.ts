import { Router } from 'express';
const api: Router = Router();

import { ColoniaInterface } from '../interfaces/colonia.interface';
import { ColoniaMiddleware } from '../middleware/colonia.middleware';

const _Colonia_Interface = new ColoniaInterface();
const _Colonia_Middleware = new ColoniaMiddleware();

api.get('/',_Colonia_Interface.obtenerColonias);
api.get('/:id_colonia',_Colonia_Middleware.validar_id_colonia,_Colonia_Interface.obtenerColonia);

export default api;