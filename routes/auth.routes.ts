import { Router } from 'express';
const api: Router = Router();

import { AuthInterface } from '../interfaces/auth.interface';
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _Auth_Interface = new AuthInterface();

api.post('/',_Auth_Interface.loguearUsuario);
api.post('/recuperar',_Auth_Interface.recuperarContrasenia);
api.put('/:id_usuario',_Auth_Interface.desloguearUsuario);
api.get('/check-status',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Auth_Interface.checkStatus);
api.post('/cambiarContrasenia/:token',_Auth_Interface.cambiarContrasenia);
api.post('/logout',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Auth_Interface.desloguearUsuarioToken);

export default api;

