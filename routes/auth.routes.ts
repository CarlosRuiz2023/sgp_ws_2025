import { Router } from 'express';
const api: Router = Router();

import { AuthInterface } from '../interfaces/auth.interface';
import { UtilJwt } from '../utils/UtilJwt';
import { UsuarioMiddleware } from '../middleware/usuario.middleware';

const _UTIL_JWT = new UtilJwt();
const _Auth_Interface = new AuthInterface();
const _Usuario_Middleware = new UsuarioMiddleware();

api.post('/',_Usuario_Middleware.validar_correo_existente,_Usuario_Middleware.validar_contrasenia,_Auth_Interface.loguearUsuario);
api.post('/recuperar',_Usuario_Middleware.validar_correo_existente,_Auth_Interface.recuperarContrasenia);
api.put('/:id_usuario',_Usuario_Middleware.validar_id_usuario,_Auth_Interface.desloguearUsuario);
api.get('/check-status',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Auth_Interface.checkStatus);
api.post('/cambiarContrasenia/:token',_Auth_Interface.cambiarContrasenia);
api.post('/logout',_UTIL_JWT.comprobarJWT.bind(_UTIL_JWT),_Auth_Interface.desloguearUsuarioToken);

export default api;

