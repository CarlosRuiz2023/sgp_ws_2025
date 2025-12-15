import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { EmpresaController } from "../controllers/empresa.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _EMPRESA_CONTROLLER = new EmpresaController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class EmpresaInterface {
    public async obtenerEmpresas(req: Request, res: Response) {
        try {
            let resultado = await _EMPRESA_CONTROLLER.obtenerEmpresas();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerEmpresas: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
            
    public async obtenerEmpresa(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado = await _EMPRESA_CONTROLLER.obtenerEmpresa(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de obtenerEmpresa : ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    
    }
}