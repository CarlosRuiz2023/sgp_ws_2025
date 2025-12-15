import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { EntregaController } from "../controllers/entrega.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _ENTREGA_CONTROLLER = new EntregaController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class EntregaInterface {
    public async obtenerEntregas(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _ENTREGA_CONTROLLER.obtenerEntregas(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerEntregas: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarEntrega(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _ENTREGA_CONTROLLER.agregarEntrega(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarEntrega: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarEntrega(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _ENTREGA_CONTROLLER.actualizarEntrega(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarEntrega: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarEntrega(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _ENTREGA_CONTROLLER.eliminarEntrega(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarEntrega: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarEntrega(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _ENTREGA_CONTROLLER.activarEntrega(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarEntrega: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}