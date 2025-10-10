import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { ContratoController } from "../controllers/contrato.controller";
import { UtilRequest } from "../utils/UtilRequest";
import { UtilJwt } from '../utils/UtilJwt';

const _UTIL_JWT = new UtilJwt();
const _UtilRequest = new UtilRequest();
const _CONTRATO_CONTROLLER = new ContratoController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class ContratoInterface {
    public async obtenerContratos(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CONTRATO_CONTROLLER.obtenerContratos(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerContratos: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async agregarContrato(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CONTRATO_CONTROLLER.agregarContrato(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de agregarContrato: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async actualizarContrato(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CONTRATO_CONTROLLER.actualizarContrato(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarContrato: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async eliminarContrato(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CONTRATO_CONTROLLER.eliminarContrato(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de eliminarContrato: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }

    public async activarContrato(req: Request, res: Response) {
        try {
            var params = _UtilRequest.getParams(req);
            let resultado = await _CONTRATO_CONTROLLER.activarContrato(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de activarContrato: ' + error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}