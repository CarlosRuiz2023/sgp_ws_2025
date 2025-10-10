import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { EstimacionController } from "../controllers/estimacion.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _ESTIMACION_CONTROLLER = new EstimacionController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class EstimacionInterface {
    public async obtenerEstimaciones(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.obtenerEstimaciones(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerEstimaciones: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerEstimacion(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.obtenerEstimacion(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerEstimacion: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }

    public async agregarEstimacion(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.agregarEstimacion(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarEstimacion: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarEstimacion(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.actualizarEstimacion(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarEstimacion: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarEstimacion(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.eliminarEstimacion(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarEstimacion: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarEstimacion(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _ESTIMACION_CONTROLLER.activarEstimacion(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarEstimacion: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}