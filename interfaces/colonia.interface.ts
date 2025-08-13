import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { ColoniaController } from "../controllers/colonia.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _COLONIA_CONTROLLER = new ColoniaController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class ColoniaInterface {
    public async obtenerColonias(req: Request, res: Response) {
        try {
            let resultado = await _COLONIA_CONTROLLER.obtenerColonias();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerColonias: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerColonia(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _COLONIA_CONTROLLER.obtenerColonia(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerColonia: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
}