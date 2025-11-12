import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { OficioSapalController } from "../controllers/oficioSapal.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilJwt } from '../utils/UtilJwt';

const _UtilRequest = new UtilRequest();
const _OFICIO_SAPAL_CONTROLLER = new OficioSapalController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class OficioSapalInterface {
    public async obtenerOficios(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OFICIO_SAPAL_CONTROLLER.obtenerOficios(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerOficios: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarOficioSapal(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OFICIO_SAPAL_CONTROLLER.agregarOficioSapal(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarOficioSapal: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarOficioSapal(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OFICIO_SAPAL_CONTROLLER.actualizarOficioSapal(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarOficioSapal: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarOficioSapal(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OFICIO_SAPAL_CONTROLLER.eliminarOficioSapal(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarOficioSapal: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarOficioSapal(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _OFICIO_SAPAL_CONTROLLER.activarOficioSapal(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarOficioSapal: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}