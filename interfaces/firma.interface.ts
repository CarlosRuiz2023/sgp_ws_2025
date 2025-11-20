import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { UtilRequest } from "../utils/UtilRequest";
import { FirmaController } from "../controllers/firma.controller";

const _UtilRequest = new UtilRequest();
const _FIRMA_CONTROLLER = new FirmaController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class FirmaInterface {
    public async obtenerFirmas(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _FIRMA_CONTROLLER.obtenerFirmas(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerFirmas: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarFirma(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _FIRMA_CONTROLLER.agregarFirma(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarFirma: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarFirma(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _FIRMA_CONTROLLER.actualizarFirma(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarFirma: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarFirma(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _FIRMA_CONTROLLER.eliminarFirma(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarFirma: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarFirma(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _FIRMA_CONTROLLER.activarFirma(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarFirma: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}