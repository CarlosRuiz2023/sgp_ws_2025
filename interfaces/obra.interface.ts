import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { ObraController } from "../controllers/obra.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _OBRA_CONTROLLER = new ObraController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class ObraInterface {
    public async obtenerObras(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObras(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerObras: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerObra(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.obtenerObra(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerObra: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }

    public async agregarObra(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.agregarObra(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarObra: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarObra(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.actualizarObra(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarObra: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarObra(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.eliminarObra(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarObra: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarObra(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OBRA_CONTROLLER.activarObra(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarObra: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}