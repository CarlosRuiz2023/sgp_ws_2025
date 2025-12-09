import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class BusquedaMiddleware {

    public async validar_limit(req: Request, res: Response, next: NextFunction) {
        try {

            let { limit = 10 } = req.query;

            if (limit === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el limit",
                });
                return;
            }

            if (typeof Number(limit) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El limit proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_limit: ' + error.message
            });
        }
    }

    public async validar_offset(req: Request, res: Response, next: NextFunction) {
        try {

            let { offset = 0 } = req.query;

            if (offset === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el offset del usuario",
                });
                return;
            }

            if (typeof Number(offset) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El offset proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_offset: ' + error.message
            });
        }
    }

    public async validar_filtro(req: Request, res: Response, next: NextFunction) {
        try {

            let { filtro = 'Default' } = req.query;

            if (filtro === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el filtro del usuario",
                });
                return;
            }

            if (typeof filtro != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El filtro proporcionado debe ser de tipo string",
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
                message: 'Error en la funcion validar_filtro: ' + error.message
            });
        }
    }

    public async validar_busqueda(req: Request, res: Response, next: NextFunction) {
        try {

            let { busqueda = 'Default' } = req.query;

            if (busqueda === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la busqueda",
                });
                return;
            }

            if (typeof busqueda != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La busqueda proporcionada debe ser de tipo string",
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
                message: 'Error en la funcion validar_busqueda: ' + error.message
            });
        }
    }
}