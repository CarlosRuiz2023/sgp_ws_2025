import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { EmailController } from "../controllers/email.controller";
import { UtilRequest } from "../utils/UtilRequest";

const _UtilRequest = new UtilRequest();
const _EMAIL_CONTROLLER = new EmailController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class EmailInterface {
       
    public async enviarCorreoInformativo(req: Request, res: Response) {
        try {
            var params = await _UtilRequest.getParams(req);
            let resultado: any = await _EMAIL_CONTROLLER.enviarCorreoInformativo(params);
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de enviarCorreoInformativo: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
    
}