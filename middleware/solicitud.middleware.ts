import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Solicitud } from "../models/solicitud.model";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class SolicitudMiddleware {

    public async validar_id_solicitud(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_solicitud } = req.params;

            if (id_solicitud === undefined) {
                id_solicitud = req.body.id_solicitud;
            }

            if (id_solicitud === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_solicitud",
                });
                return;
            }

            if (typeof id_solicitud != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_solicitud proporcionado debe ser de tipo number",
                });
                return;
            }

            const solicitud = await Solicitud.findByPk(id_solicitud);
            if (solicitud.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_solicitud proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (solicitud.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La solicitud con el id_solicitud proporcionado se encuentra inactiva",
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
                message: 'Error en la funcion validar_id_solicitud: ' + error.message
            });
        }
    }

    public async validar_id_solicitud_inactiva(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_solicitud } = req.params;

            if (id_solicitud === undefined) {
                id_solicitud = req.body.id_solicitud;
            }

            if (id_solicitud === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_solicitud",
                });
                return;
            }

            if (typeof id_solicitud != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_solicitud proporcionado debe ser de tipo number",
                });
                return;
            }

            const solicitud = await Solicitud.findByPk(id_solicitud);
            if (solicitud.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_solicitud proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (solicitud.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La solicitud con el id_solicitud proporcionado se encuentra activa",
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
                message: 'Error en la funcion validar_id_solicitud_inactiva: ' + error.message
            });
        }
    }

    public async validar_id_usuario_solicitud(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_solicitud } = req.params;

            if (id_usuario_solicitud === undefined) {
                id_usuario_solicitud = req.body.id_usuario_solicitud;
            }

            if (id_usuario_solicitud === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_solicitud",
                });
                return;
            }

            if (typeof id_usuario_solicitud != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_solicitud proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_solicitud);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_solicitud proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_solicitud proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_solicitud: ' + error.message
            });
        }
    }

    public async validar_id_usuario_laboratorio(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_laboratorio } = req.params;

            if (id_usuario_laboratorio === undefined) {
                id_usuario_laboratorio = req.body.id_usuario_laboratorio;
            }

            if (id_usuario_laboratorio === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_laboratorio",
                });
                return;
            }

            if (typeof id_usuario_laboratorio != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_laboratorio proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_laboratorio);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_laboratorio proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_laboratorio proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_laboratorio: ' + error.message
            });
        }
    }

    public async validar_id_usuario_ms(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_ms } = req.params;

            if (id_usuario_ms === undefined) {
                id_usuario_ms = req.body.id_usuario_ms;
            }

            if (id_usuario_ms === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_ms",
                });
                return;
            }

            if (typeof id_usuario_ms != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_ms proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(id_usuario_ms);
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_ms proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_ms proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_ms: ' + error.message
            });
        }
    }

    public async validar_fecha(req: Request, res: Response, next: NextFunction) {
        try {

            let { fecha_solicitud } = req.params;

            if (fecha_solicitud === undefined) {
                fecha_solicitud = req.body.fecha_inicio;
            }

            if (fecha_solicitud === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la fecha_inicio del contrato",
                });
                return;
            }

            if (typeof fecha_solicitud != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_inicio proporcionada debe ser de tipo string",
                });
                return;
            }

            // Convertir a Date
            const fechaInicioDate = new Date(fecha_solicitud);

            // Validar que sean fechas válidas
            if (isNaN(fechaInicioDate.getTime())) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_inicio no es una fecha válida",
                });
            }

            next();

        } catch (error: any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code: 500,
                success: false,
                data: null,
                message: 'Error en la funcion validar_fecha: ' + error.message
            });
        }
    }
}