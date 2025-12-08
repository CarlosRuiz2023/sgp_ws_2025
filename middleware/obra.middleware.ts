import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Obra } from "../models/obra.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class ObraMiddleware {

    public async validar_id_obra(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_obra } = req.params;

            if (id_obra === undefined) {
                id_obra = req.body.id_obra;
            }

            if (id_obra === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_obra",
                });
                return;
            }

            if (typeof id_obra != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_obra proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const obra = await Obra.findByPk(id_obra);
            if (obra.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_obra proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(obra.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obra con el id_obra proporcionado se encuentra inactiva",
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
                message: 'Error en la funcion validar_id_obra: '+error.message
            });
        }
    }

    public async validar_id_obra_inactiva(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_obra } = req.params;

            if (id_obra === undefined) {
                id_obra = req.body.id_obra;
            }

            if (id_obra === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_obra",
                });
                return;
            }

            if (typeof id_obra != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_obra proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const obra = await Obra.findByPk(id_obra);
            if (obra.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_obra proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(obra.estatus === 1){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La obra con el id_obra proporcionado se encuentra activa",
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
                message: 'Error en la funcion validar_id_obra: '+error.message
            });
        }
    }

    public async validar_calle(req: Request, res: Response, next: NextFunction) {
        try {

            let { calle } = req.params;

            if (calle === undefined) {
                calle = req.body.calle;
            }

            if (calle === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la calle",
                });
                return;
            }

            if (typeof calle != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La calle proporcionada debe ser de tipo string",
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
                message: 'Error en la funcion validar_calle: '+error.message
            });
        }
    }

    public async validar_tramo(req: Request, res: Response, next: NextFunction) {
        try {

            let { tramo } = req.params;

            if (tramo === undefined) {
                tramo = req.body.tramo;
            }

            if (tramo === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el tramo",
                });
                return;
            }

            if (typeof tramo != "string") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El tramo proporcionado debe ser de tipo string",
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
                message: 'Error en la funcion validar_tramo: '+error.message
            });
        }
    }
}