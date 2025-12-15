import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { AuthController } from "../controllers/auth.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _AUTH_CONTROLLER = new AuthController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class AuthInterface {
    public async loguearUsuario(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado: any = await _AUTH_CONTROLLER.loguearUsuario(params);
            const {Usuario=undefined} = resultado;
            if(!Usuario){
                return res.status(401).json({
                    success: false,
                    data: resultado
                });
            }
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de loguearUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
    
    public async recuperarContrasenia(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado: any = await _AUTH_CONTROLLER.recuperarContrasenia(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de recuperarContrasenia: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async desloguearUsuario(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _AUTH_CONTROLLER.desloguearUsuario(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de desloguearUsuario: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }

    public async desloguearUsuarioToken(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _AUTH_CONTROLLER.desloguearUsuarioToken(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de desloguearUsuarioToken: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
            
    public async checkStatus(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _AUTH_CONTROLLER.checkStatus(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de checkStatus: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
            
    public async cambiarContrasenia(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            await _AUTH_CONTROLLER.cambiarContrasenia(params,res);
            /* return res.status(200).json({
                success: false,
                data: resultado
            }); */
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de cambiarContrasenia: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
}