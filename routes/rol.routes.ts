import { Router } from 'express';
const api: Router = Router();

import { RolInterface } from '../interfaces/rol.interface';
import { RolMiddleware } from '../middleware/rol.middleware';

const _Rol_Interface = new RolInterface();
const _Rol_Middleware = new RolMiddleware();

api.get('/',_Rol_Interface.obtenerRoles);
api.get('/:id_rol',_Rol_Middleware.validar_id_rol,_Rol_Interface.obtenerRol);

export default api;