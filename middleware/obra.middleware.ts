import type { Request, Response, NextFunction } from "express";
//import { dbAccess } from "../config/db/connection";
import { UtilLogError } from "../utils/UtilLogError";
const UTIL_LOG_ERROR = new UtilLogError();

export class ObraMiddleware {

    public async validarObr_clvAccess(req: Request, res: Response, next: NextFunction) {
        /* try {

            let { obr_clv } = req.params;

            if (obr_clv === undefined) {
                obr_clv = req.body.obr_clv;
            }

            if (obr_clv === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la obr_clv",
                });
                return;
            }

            if (obr_clv.length != 10) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obr_clv debe de tener 10 digitos",
                });
                return;
            }

            const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
            if (obra.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El obr_clv proporcionado no existe dentro de la base de datos de Access",
                });
                return;
            }

            next();

        } catch (error:any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code:500,
                success: false,
                data: null,
                message: 'Error en la funcion validarObr_clvAccess: '+error.message
            });
        } */
    }
}