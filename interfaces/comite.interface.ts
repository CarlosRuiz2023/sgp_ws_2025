import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { ComiteController } from "../controllers/comite.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _UtilRequest = new UtilRequest();
const _COMITE_CONTROLLER = new ComiteController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class ComiteInterface {
    public async obtenerComites(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _COMITE_CONTROLLER.obtenerComites(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerComites: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async obtenerComite(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _COMITE_CONTROLLER.obtenerComite(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerComite: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }

    }

    public async agregarComite(req: Request, res: Response) {
        try {
            let resultado = await _COMITE_CONTROLLER.agregarComite(req);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarComite: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarComite(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _COMITE_CONTROLLER.eliminarComite(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarComite: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarComite(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _COMITE_CONTROLLER.activarComite(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarComite: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}