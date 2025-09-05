import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { UploadController } from "../controllers/upload.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _UPLOAD_CONTROLLER = new UploadController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class UploadInterface {
    public async cargarArchivo(req: Request, res: Response) {
        try {
            let resultado = await _UPLOAD_CONTROLLER.cargarArchivo(req);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de cargarArchivo: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async mostrarArchivo(req: Request, res: Response) {
        try {
            await _UPLOAD_CONTROLLER.mostrarArchivo(req, res);
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de mostrarArchivo: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }

    }

    public async actualizarArchivo(req: Request, res: Response) {
        try {
            let resultado = await _UPLOAD_CONTROLLER.actualizarArchivo(req);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de mostrarArchivo: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }

    }
}