import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Firma } from "../models/firma.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class FirmaMiddleware {

    public async validar_id_firma(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_firma } = req.params;

            if (id_firma === undefined) {
                id_firma = req.body.id_firma;
            }

            if (id_firma === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_firma",
                });
                return;
            }

            if (typeof id_firma != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_firma proporcionado debe ser de tipo number",
                });
                return;
            }

            const firma = await Firma.findByPk(id_firma);
            if (firma.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_firma proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (firma.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La firma con el id_firma proporcionado se encuentra inactiva",
                });
                return;
            }

            next();

        } catch (error: any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code: 500,
                success: false,
                data: null,
                message: 'Error en la funcion validar_id_firma: ' + error.message
            });
        }
    }

    public async validar_id_firma_inactiva(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_firma } = req.params;

            if (id_firma === undefined) {
                id_firma = req.body.id_firma;
            }

            if (id_firma === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_firma",
                });
                return;
            }

            if (typeof id_firma != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_firma proporcionado debe ser de tipo number",
                });
                return;
            }

            const firma = await Firma.findByPk(id_firma);
            if (firma.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_firma proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (firma.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La firma con el id_firma proporcionado se encuentra activa",
                });
                return;
            }

            next();

        } catch (error: any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code: 500,
                success: false,
                data: null,
                message: 'Error en la funcion validar_id_firma: ' + error.message
            });
        }
    }
}