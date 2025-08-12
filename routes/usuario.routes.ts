import { Router } from 'express';
const api: Router = Router();

import { UsuarioInterface } from '../interfaces/usuario.interface';
const _Usuario_Interface = new UsuarioInterface();

api.get('/',_Usuario_Interface.obtenerUsuarios);
api.get('/:id_usuario',_Usuario_Interface.obtenerUsuario);
api.post('/',_Usuario_Interface.agregarUsuario);
api.put('/:id_usuario',_Usuario_Interface.actualizarUsuario);
api.put('/actualizarContrasenia/:id_usuario',_Usuario_Interface.actualizarContrasenia);
api.delete('/:id_usuario',_Usuario_Interface.eliminarUsuario);
api.put('/activar/:id_usuario',_Usuario_Interface.activarUsuario);

export default api;