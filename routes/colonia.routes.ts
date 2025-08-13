import { Router } from 'express';
const api: Router = Router();

import { ColoniaInterface } from '../interfaces/colonia.interface';
const _Colonia_Interface = new ColoniaInterface();

api.get('/',_Colonia_Interface.obtenerColonias);
api.get('/:id_colonia',_Colonia_Interface.obtenerColonia);

export default api;