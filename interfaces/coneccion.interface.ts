import type { Request, Response } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { ConeccionController } from "../controllers/coneccion.controller";

const _CONECCION_CONTROLLER = new ConeccionController();
const _UTIL_LOG_ERROR = new UtilLogError();

export class ConeccionInterface {
    public async coneccionPostgreSQL(req: Request, res: Response) {
        try {
            let resultado = await _CONECCION_CONTROLLER.coneccionPostgreSQL();
            return res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error:any) {
            console.log(error);
            _UTIL_LOG_ERROR.escribirErrorEnLog('Error durante la ejecución de actualizarCarteraVencidaSql: ' +error.message);
            return res.status(500).json({ success: false, data: null });
        }
    }
}