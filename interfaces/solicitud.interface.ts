import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { SolicitudController } from "../controllers/solicitud.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilJwt } from '../utils/UtilJwt';

const _UtilRequest = new UtilRequest();
const _SOLICITUD_CONTROLLER = new SolicitudController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class SolicitudInterface {
    public async obtenerSolicitudes(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _SOLICITUD_CONTROLLER.obtenerSolicitudes(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerSolicitudes: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarSolicitud(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _SOLICITUD_CONTROLLER.agregarSolicitud(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarSolicitud: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarSolicitud(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _SOLICITUD_CONTROLLER.actualizarSolicitud(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarSolicitud: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarSolicitud(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _SOLICITUD_CONTROLLER.eliminarSolicitud(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarSolicitud: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarSolicitud(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _SOLICITUD_CONTROLLER.activarSolicitud(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarSolicitud: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}