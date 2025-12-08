import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Colonia } from "../models/colonia.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class ColoniaMiddleware {

    public async validar_id_colonia(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_colonia } = req.params;

            if (id_colonia === undefined) {
                id_colonia = req.body.id_colonia;
            }

            if (id_colonia === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_colonia",
                });
                return;
            }

            if (typeof id_colonia != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_colonia proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const colonia = await Colonia.findByPk(id_colonia);
            if (colonia.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_colonia proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if(colonia.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La colonia con el id_colonia proporcionado se encuentra inactiva",
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
                message: 'Error en la funcion validar_id_colonia: '+error.message
            });
        }
    }
}