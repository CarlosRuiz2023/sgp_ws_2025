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
            var params = _UtilRequest.getParams(req);
            let resultado = await _AUTH_CONTROLLER.loguearUsuario(params);
            const {token} = resultado;
            if(!token){
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
            
    public async desloguearUsuario(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
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
}