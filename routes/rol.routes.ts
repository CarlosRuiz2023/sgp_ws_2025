import { Router } from 'express';
const api: Router = Router();

import { RolInterface } from '../interfaces/rol.interface';
const _Rol_Interface = new RolInterface();

api.get('/',_Rol_Interface.obtenerRoles);
api.get('/:id_rol',_Rol_Interface.obtenerRol);

export default api;