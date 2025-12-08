import { Router } from 'express';
const api: Router = Router();

import { UsuarioInterface } from '../interfaces/usuario.interface';
import { BusquedaMiddleware } from '../middleware/busqueda.middleware';
import { UsuarioMiddleware } from '../middleware/usuario.middleware';
import { RolMiddleware } from '../middleware/rol.middleware';
import { EmpresaMiddleware } from '../middleware/empresa.middleware';

const _Usuario_Interface = new UsuarioInterface();
const _Busqueda_Middleware = new BusquedaMiddleware();
const _Usuario_Middleware = new UsuarioMiddleware();
const _Rol_Middleware = new RolMiddleware();
const _Empresa_Middleware = new EmpresaMiddleware();

api.get('/',_Busqueda_Middleware.validar_limit, _Busqueda_Middleware.validar_offset,_Busqueda_Middleware.validar_filtro,_Busqueda_Middleware.validar_busqueda,_Usuario_Interface.obtenerUsuarios);
api.get('/:id_usuario',_Usuario_Middleware.validar_id_usuario,_Usuario_Interface.obtenerUsuario);
api.post('/',_Rol_Middleware.validar_id_rol,_Empresa_Middleware.validar_id_empresa,_Usuario_Middleware.validar_nombres, _Usuario_Middleware.validar_apellido_paterno, _Usuario_Middleware.validar_apellido_materno,_Usuario_Middleware.validar_correo_inexistente,_Usuario_Middleware.validar_contrasenia,_Usuario_Interface.agregarUsuario);
api.put('/:id_usuario',_Usuario_Middleware.validar_id_usuario,_Rol_Middleware.validar_id_rol,_Empresa_Middleware.validar_id_empresa,_Usuario_Middleware.validar_nombres, _Usuario_Middleware.validar_apellido_paterno, _Usuario_Middleware.validar_apellido_materno,_Usuario_Middleware.validar_correo_propio, _Usuario_Interface.actualizarUsuario);
api.put('/actualizarContrasenia/:id_usuario',_Usuario_Middleware.validar_id_usuario, _Usuario_Middleware.validar_contrasenia,_Usuario_Interface.actualizarContrasenia);
api.delete('/:id_usuario',_Usuario_Middleware.validar_id_usuario,_Usuario_Interface.eliminarUsuario);
api.put('/activar/:id_usuario',_Usuario_Middleware.validar_id_usuario_inactivo,_Usuario_Interface.activarUsuario);

export default api;