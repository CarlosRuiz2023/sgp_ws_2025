import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { RolController } from "../controllers/rol.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _ROL_CONTROLLER = new RolController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class RolInterface {
    public async obtenerRoles(req: Request, res: Response) {
        try {
            let resultado = await _ROL_CONTROLLER.obtenerRoles();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerRoles: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerRol(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ROL_CONTROLLER.obtenerRol(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerRol: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
}