import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Comite } from "../models/comite.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class ComiteMiddleware {

    public async validar_id_comite(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_comite } = req.params;

            if (id_comite === undefined) {
                id_comite = req.body.id_firma;
            }

            if (id_comite === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_comite",
                });
                return;
            }

            if (typeof id_comite != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_comite proporcionado debe ser de tipo number",
                });
                return;
            }

            const comite = await Comite.findByPk(id_comite);
            if (comite.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_comite proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (comite.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El comite con el id_comite proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_comite: ' + error.message
            });
        }
    }

    public async validar_id_comite_inactivo(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_comite } = req.params;

            if (id_comite === undefined) {
                id_comite = req.body.id_firma;
            }

            if (id_comite === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_comite",
                });
                return;
            }

            if (typeof id_comite != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_comite proporcionado debe ser de tipo number",
                });
                return;
            }

            const comite = await Comite.findByPk(id_comite);
            if (comite.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_comite proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (comite.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El comite con el id_comite proporcionado se encuentra activo",
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
                message: 'Error en la funcion validar_id_comite_inactivo: ' + error.message
            });
        }
    }

    public async validar_tipo(req: Request, res: Response, next: NextFunction) {
        try {

            let { tipo } = req.params;

            if (tipo === undefined) {
                tipo = req.body.tipo;
            }

            if (tipo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el tipo de comite",
                });
                return;
            }

            if (typeof tipo != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El tipo proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_tipo: ' + error.message
            });
        }
    }

    public async validar_punto(req: Request, res: Response, next: NextFunction) {
        try {

            let { punto } = req.params;

            if (punto === undefined) {
                punto = req.body.punto;
            }

            if (punto === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el punto del comite",
                });
                return;
            }

            if (typeof punto != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El punto proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_punto: ' + error.message
            });
        }
    }

    public async validar_costo(req: Request, res: Response, next: NextFunction) {
        try {

            let { costo } = req.params;

            if (costo === undefined) {
                costo = req.body.costo;
            }

            if (costo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el costo del comite",
                });
                return;
            }

            if (typeof costo != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El costo proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_costo: ' + error.message
            });
        }
    }
}