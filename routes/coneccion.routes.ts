import { Router } from 'express';
const api: Router = Router();

import { ConeccionInterface } from '../interfaces/coneccion.interface';
const _Coneccion_Interface = new ConeccionInterface();

api.get('/acceso-a-postgresql',_Coneccion_Interface.coneccionPostgreSQL);

export default api;