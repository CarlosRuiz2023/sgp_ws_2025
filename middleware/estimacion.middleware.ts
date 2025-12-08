import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Estimacion } from "../models/estimacion.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class EstimacionMiddleware {

    public async validar_id_estimacion(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_estimacion } = req.params;

            if (id_estimacion === undefined) {
                id_estimacion = req.body.id_estimacion;
            }

            if (id_estimacion === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_estimacion",
                });
                return;
            }

            if (typeof id_estimacion != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_estimacion proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const estimacion = await Estimacion.findByPk(id_estimacion);
            if (estimacion.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_estimacion proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if (estimacion.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La estimacion con el id_estimacion proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_estimacion: ' + error.message
            });
        }
    }

    public async validar_id_estimacion_inactiva(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_estimacion } = req.params;

            if (id_estimacion === undefined) {
                id_estimacion = req.body.id_estimacion;
            }

            if (id_estimacion === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_estimacion",
                });
                return;
            }

            if (typeof id_estimacion != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_estimacion proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const estimacion = await Estimacion.findByPk(id_estimacion);
            if (estimacion.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_estimacion proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if (estimacion.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La estimacion con el id_estimacion proporcionado se encuentra activa",
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
                message: 'Error en la funcion validar_id_estimacion_inactiva: ' + error.message
            });
        }
    }

    public async validar_finiquito(req: Request, res: Response, next: NextFunction) {
        try {

            let finiquito : string | boolean | undefined;

            finiquito = req.params.finiquito;

            if (finiquito === undefined) {
                finiquito = req.body.finiquito;
            }

            if (finiquito === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el finiquito",
                });
                return;
            }

            // Normalizar el valor a boolean
            if (typeof finiquito === 'string') {
                if (finiquito.toLowerCase() === 'true') finiquito = true;
                else if (finiquito.toLowerCase() === 'false') finiquito = false;
            }

            if (typeof finiquito !== "boolean") {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El finiquito debe ser true o false",
                });
            }

            // Opcional: guardar el valor limpio para el siguiente middleware
            req.body.finiquito = finiquito;

            next();

        } catch (error: any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code: 500,
                success: false,
                data: null,
                message: 'Error en la funcion validar_finiquito: ' + error.message
            });
        }
    }

    public async validar_avance_fisico(req: Request, res: Response, next: NextFunction) {
        try {

            let { avance_fisico } = req.params;

            if (avance_fisico === undefined) {
                avance_fisico = req.body.avance_fisico;
            }

            if (avance_fisico === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el avance_fisico",
                });
                return;
            }

            if (typeof avance_fisico != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El avance_fisico proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_avance_fisico: ' + error.message
            });
        }
    }

    public async validar_avance_financiero(req: Request, res: Response, next: NextFunction) {
        try {

            let { avance_financiero } = req.params;

            if (avance_financiero === undefined) {
                avance_financiero = req.body.avance_financiero;
            }

            if (avance_financiero === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el avance_financiero",
                });
                return;
            }

            if (typeof avance_financiero != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El avance_financiero proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_avance_financiero: ' + error.message
            });
        }
    }

    public async validar_monto_estimado_actual(req: Request, res: Response, next: NextFunction) {
        try {

            let { actual } = req.params;

            if (actual === undefined) {
                actual = req.body.actual;
            }

            if (actual === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el monto estimado actual",
                });
                return;
            }

            if (typeof actual != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El monto estimado actual proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_monto_estimado_actual: ' + error.message
            });
        }
    }

    public async validar_monto_estimado_anterior(req: Request, res: Response, next: NextFunction) {
        try {

            let { anterior } = req.params;

            if (anterior === undefined) {
                anterior = req.body.anterior;
            }

            if (anterior === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el monto estimado anterior",
                });
                return;
            }

            if (typeof anterior != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El monto estimado anterior proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_monto_estimado_anterior: ' + error.message
            });
        }
    }
}