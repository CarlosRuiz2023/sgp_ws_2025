import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { OficioSapal } from "../models/oficioSapal.model";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class OficioSapalMiddleware {

    public async validar_id_oficio_sapal(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_oficio_sapal } = req.params;

            if (id_oficio_sapal === undefined) {
                id_oficio_sapal = req.body.id_oficio_sapal;
            }

            if (id_oficio_sapal === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_oficio_sapal",
                });
                return;
            }

            if (typeof id_oficio_sapal != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_oficio_sapal proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const oficio_sapal = await OficioSapal.findByPk(id_oficio_sapal);
            if (oficio_sapal.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_oficio_sapal proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(oficio_sapal.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El oficio sapal con el id_oficio_sapal proporcionada se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_oficio_sapal: '+error.message
            });
        }
    }

    public async validar_id_oficio_sapal_inactivo(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_oficio_sapal } = req.params;

            if (id_oficio_sapal === undefined) {
                id_oficio_sapal = req.body.id_oficio_sapal;
            }

            if (id_oficio_sapal === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_oficio_sapal",
                });
                return;
            }

            if (typeof id_oficio_sapal != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_oficio_sapal proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const oficio_sapal = await OficioSapal.findByPk(id_oficio_sapal);
            if (oficio_sapal.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_oficio_sapal proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(oficio_sapal.estatus === 1){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El oficio sapal con el id_oficio_sapal proporcionada se encuentra activo",
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
                message: 'Error en la funcion validar_id_oficio_sapal_inactivo: '+error.message
            });
        }
    }

    public async validar_id_usuario_sapal(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_sapal } = req.params;

            if (id_usuario_sapal === undefined) {
                id_usuario_sapal = req.body.id_usuario_sapal;
            }

            if (id_usuario_sapal === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_sapal",
                });
                return;
            }

            if (typeof id_usuario_sapal != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_sapal proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_sapal);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_sapal proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_sapal proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_sapal: ' + error.message
            });
        }
    }

    public async validar_observaciones(req: Request, res: Response, next: NextFunction) {
        try {

            let { observaciones= 'Default' } = req.params;

            if (observaciones === undefined) {
                observaciones = req.body.observaciones;
            }

            if (observaciones === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar las observaciones",
                });
                return;
            }

            if (typeof observaciones != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Las observaciones proporcionadas deben ser de tipo string",
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
                message: 'Error en la funcion validar_observaciones: ' + error.message
            });
        }
    }
}