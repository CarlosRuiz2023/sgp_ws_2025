import { Router } from 'express';
const api: Router = Router();

import { AuthInterface } from '../interfaces/auth.interface';
const _Auth_Interface = new AuthInterface();

api.post('/',_Auth_Interface.loguearUsuario);
api.put('/:id_usuario',_Auth_Interface.desloguearUsuario);

export default api;