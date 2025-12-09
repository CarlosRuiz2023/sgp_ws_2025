import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Contrato } from "../models/contrato.model";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class ContratoMiddleware {

    public async validar_id_contrato(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_contrato } = req.params;

            if (id_contrato === undefined) {
                id_contrato = req.body.id_contrato;
            }

            if (id_contrato === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_contrato",
                });
                return;
            }

            if (typeof Number(id_contrato) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_contrato proporcionado debe ser de tipo number",
                });
                return;
            }

            const contrato = await Contrato.findByPk(Number(id_contrato));
            if (contrato.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_contrato proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (contrato.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El contrato con el id_contrato proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_contrato: ' + error.message
            });
        }
    }

    public async validar_id_contrato_inactivo(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_contrato } = req.params;

            if (id_contrato === undefined) {
                id_contrato = req.body.id_contrato;
            }

            if (id_contrato === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_contrato",
                });
                return;
            }

            if (typeof Number(id_contrato) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_contrato proporcionado debe ser de tipo number",
                });
                return;
            }

            const contrato = await Contrato.findByPk(Number(id_contrato));
            if (contrato.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_contrato proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (contrato.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El contrato con el id_contrato proporcionado se encuentra activo",
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
                message: 'Error en la funcion validar_id_contrato_inactivo: ' + error.message
            });
        }
    }

    public async validar_id_usuario_contratista(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_contratista } = req.params;

            if (id_usuario_contratista === undefined) {
                id_usuario_contratista = req.body.id_usuario_contratista;
            }

            if (id_usuario_contratista === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_contratista",
                });
                return;
            }

            if (typeof Number(id_usuario_contratista) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_contratista proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(Number(id_usuario_contratista));
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_contratista proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_contratista proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_contratista: ' + error.message
            });
        }
    }

    public async validar_id_usuario_supervisor(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario_supervisor } = req.params;

            if (id_usuario_supervisor === undefined) {
                id_usuario_supervisor = req.body.id_usuario_supervisor;
            }

            if (id_usuario_supervisor === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario_supervisor",
                });
                return;
            }

            if (typeof Number(id_usuario_supervisor) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario_supervisor proporcionado debe ser de tipo number",
                });
                return;
            }

            const usuario = await Usuario.findByPk(Number(id_usuario_supervisor));
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario_supervisor proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario_supervisor proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario_supervisor: ' + error.message
            });
        }
    }

    public async validar_costo_real(req: Request, res: Response, next: NextFunction) {
        try {

            let { costo_real } = req.params;

            if (costo_real === undefined) {
                costo_real = req.body.costo_real;
            }

            if (costo_real === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el costo_real del contrato",
                });
                return;
            }

            if (typeof Number(costo_real) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El costo_real proporcionado debe ser de tipo number",
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
                message: 'Error en la funcion validar_costo_real: ' + error.message
            });
        }
    }

    public async validar_fechas(req: Request, res: Response, next: NextFunction) {
        try {

            let { fecha_inicio, fecha_termino } = req.params;

            if (fecha_inicio === undefined) {
                fecha_inicio = req.body.fecha_inicio;
            }

            if (fecha_termino === undefined) {
                fecha_termino = req.body.fecha_termino;
            }

            if (fecha_inicio === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la fecha_inicio del contrato",
                });
                return;
            }

            if (fecha_termino === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la fecha_termino del contrato",
                });
                return;
            }

            if (typeof fecha_inicio != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_inicio proporcionada debe ser de tipo string",
                });
                return;
            }

            if (typeof fecha_termino != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_termino proporcionada debe ser de tipo string",
                });
                return;
            }

            // Convertir a Date
            const fechaInicioDate = new Date(fecha_inicio);
            const fechaTerminoDate = new Date(fecha_termino);

            // Validar que sean fechas válidas
            if (isNaN(fechaInicioDate.getTime())) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_inicio no es una fecha válida",
                });
            }

            if (isNaN(fechaTerminoDate.getTime())) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_termino no es una fecha válida",
                });
            }

            // Validar que inicio sea menor que término
            if (fechaInicioDate.getTime() >= fechaTerminoDate.getTime()) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La fecha_inicio debe ser menor que la fecha_termino",
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
                message: 'Error en la funcion validar_fechas: ' + error.message
            });
        }
    }
}