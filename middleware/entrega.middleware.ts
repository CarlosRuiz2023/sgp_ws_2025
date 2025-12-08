import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Entrega } from "../models/entrega.model";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class EntregaMiddleware {

    public async validar_id_entrega(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_entrega } = req.params;

            if (id_entrega === undefined) {
                id_entrega = req.body.id_entrega;
            }

            if (id_entrega === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_entrega",
                });
                return;
            }

            if (typeof id_entrega != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_entrega proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const entrega = await Entrega.findByPk(id_entrega);
            if (entrega.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_entrega proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(entrega.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La entrega con el id_entrega proporcionada se encuentra inactiva",
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
                message: 'Error en la funcion validar_id_entrega: '+error.message
            });
        }
    }

    public async validar_id_entrega_inactiva(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_entrega } = req.params;

            if (id_entrega === undefined) {
                id_entrega = req.body.id_entrega;
            }

            if (id_entrega === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_entrega",
                });
                return;
            }

            if (typeof id_entrega != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_entrega proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const entrega = await Entrega.findByPk(id_entrega);
            if (entrega.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_entrega proporcionada no existe dentro de la base de datos",
                });
                return;
            }

            if(entrega.estatus === 1){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La entrega con el id_entrega proporcionada se encuentra activa",
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
                message: 'Error en la funcion validar_id_entrega_inactiva: '+error.message
            });
        }
    }

    public async validar_id_usuario_fisico(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_fisico } = req.params;

            if (id_usuario_fisico === undefined) {
                id_usuario_fisico = req.body.id_usuario_fisico;
            }

            if (id_usuario_fisico === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_fisico",
                });
                return;
            }

            if (typeof id_usuario_fisico != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_fisico proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_fisico);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_fisico proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_fisico proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_fisico: ' + error.message
            });
        }
    }

    public async validar_id_usuario_administrativo(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_administrativo } = req.params;

            if (id_usuario_administrativo === undefined) {
                id_usuario_administrativo = req.body.id_usuario_administrativo;
            }

            if (id_usuario_administrativo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_administrativo",
                });
                return;
            }

            if (typeof id_usuario_administrativo != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_administrativo proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_administrativo);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_administrativo proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_administrativo proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_administrativo: ' + error.message
            });
        }
    }
}