import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { UsuarioController } from "../controllers/usuario.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _USUARIO_CONTROLLER = new UsuarioController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class UsuarioInterface {
    public async obtenerUsuarios(req: Request, res: Response) {
        try {
            let resultado = await _USUARIO_CONTROLLER.obtenerUsuarios();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerUsuarios: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.obtenerUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }

    public async agregarUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.agregarUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.actualizarUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarContrasenia(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.actualizarContrasenia(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarContrasenia: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.eliminarUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _USUARIO_CONTROLLER.activarUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}