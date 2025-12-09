import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Usuario } from "../models/usuario.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class UsuarioMiddleware {

    public async validar_id_usuario(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario } = req.params;

            if (id_usuario === undefined) {
                id_usuario = req.body.id_usuario;
            }

            if (id_usuario === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario",
                });
                return;
            }

            if (typeof Number(id_usuario) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const usuario = await Usuario.findByPk(Number(id_usuario));
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 0) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_usuario: ' + error.message
            });
        }
    }

    public async validar_id_usuario_inactivo(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_usuario } = req.params;

            if (id_usuario === undefined) {
                id_usuario = req.body.id_usuario;
            }

            if (id_usuario === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_usuario",
                });
                return;
            }

            if (typeof Number(id_usuario) != "number") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El id_usuario proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const usuario = await Usuario.findByPk(Number(id_usuario));
            if (usuario.length === 0) {
                res.status(404).json({
                    code: 404,
                    success: false,
                    data: null,
                    message: "El id_usuario proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if (usuario.estatus === 1) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El usuario con el id_usuario proporcionado se encuentra activo",
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
                message: 'Error en la funcion validar_id_usuario_inactivo: ' + error.message
            });
        }
    }

    public async validar_nombres(req: Request, res: Response, next: NextFunction) {
        try {

            let { nombres } = req.params;

            if (nombres === undefined) {
                nombres = req.body.nombres;
            }

            if (nombres === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el nombre del usuario",
                });
                return;
            }

            if (typeof nombres != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El nombre proporcionado debe ser de tipo string",
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
                message: 'Error en la funcion validar_nombres: ' + error.message
            });
        }
    }

    public async validar_apellido_paterno(req: Request, res: Response, next: NextFunction) {
        try {

            let { apellido_paterno } = req.params;

            if (apellido_paterno === undefined) {
                apellido_paterno = req.body.apellido_paterno;
            }

            if (apellido_paterno === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el apellido_paterno del usuario",
                });
                return;
            }

            if (typeof apellido_paterno != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El apellido_paterno proporcionado debe ser de tipo string",
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
                message: 'Error en la funcion validar_apellido_paterno: ' + error.message
            });
        }
    }

    public async validar_apellido_materno(req: Request, res: Response, next: NextFunction) {
        try {

            let { apellido_materno = 'Default' } = req.params;

            if (apellido_materno === undefined) {
                apellido_materno = req.body.apellido_materno;
            }

            if (apellido_materno === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el apellido_materno del usuario",
                });
                return;
            }

            if (typeof apellido_materno != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El apellido_materno proporcionado debe ser de tipo string",
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
                message: 'Error en la funcion validar_apellido_materno: ' + error.message
            });
        }
    }

    public async validar_correo_inexistente(req: Request, res: Response, next: NextFunction) {
        try {

            let { correo } = req.params;

            if (correo === undefined) {
                correo = req.body.correo;
            }

            if (correo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el correo del usuario",
                });
                return;
            }

            if (typeof correo != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El correo proporcionado debe ser de tipo string",
                });
                return;
            }

            // 🔹 Expresión regular para validar email
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!regexCorreo.test(correo)) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El formato del correo electrónico no es válido",
                });
                return;
            }

            const usuario = await Usuario.findAll({ where: { correo: correo } });
            if (usuario.length > 0) {
                res.status(409).json({
                    code: 409,
                    success: false,
                    data: null,
                    message: "El correo proporcionado ya existe dentro de la base de datos",
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
                message: 'Error en la funcion validar_correo_inexistente: ' + error.message
            });
        }
    }

    public async validar_correo_existente(req: Request, res: Response, next: NextFunction) {
        try {

            let { correo } = req.params;

            if (correo === undefined) {
                correo = req.body.correo;
            }

            if (correo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el correo del usuario",
                });
                return;
            }

            if (typeof correo != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El correo proporcionado debe ser de tipo string",
                });
                return;
            }

            // 🔹 Expresión regular para validar email
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!regexCorreo.test(correo)) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El formato del correo electrónico no es válido",
                });
                return;
            }

            const usuario = await Usuario.findAll({ where: { correo: correo } });
            if (usuario.length == 0) {
                res.status(409).json({
                    code: 409,
                    success: false,
                    data: null,
                    message: "El correo proporcionado no existe dentro de la base de datos",
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
                message: 'Error en la funcion validar_correo_existente: ' + error.message
            });
        }
    }

    public async validar_correo_propio(req: Request, res: Response, next: NextFunction) {
        try {

            let { correo, id_usuario } = req.params;

            if (correo === undefined) {
                correo = req.body.correo;
            }

            if (correo === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el correo del usuario",
                });
                return;
            }

            if (typeof correo != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El correo proporcionado debe ser de tipo string",
                });
                return;
            }

            // 🔹 Expresión regular para validar email
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (!regexCorreo.test(correo)) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "El formato del correo electrónico no es válido",
                });
                return;
            }

            const usuario = await Usuario.findAll({ where: { correo: correo } });

            if (usuario.length > 0) {
                const { id_usuario: idUsuarioEncontrado } = usuario[0];
                if (idUsuarioEncontrado !== Number(id_usuario)) {
                    res.status(409).json({
                        code: 409,
                        success: false,
                        data: null,
                        message: "El correo proporcionado ya existe dentro de la base de datos",
                    });
                    return;
                }
            }

            next();

        } catch (error: any) {
            console.log(error);
            UTIL_LOG_ERROR.escribirErrorEnLog(error.message);
            return res.status(500).send({
                code: 500,
                success: false,
                data: null,
                message: 'Error en la funcion validar_correo_propio: ' + error.message
            });
        }
    }

    public async validar_contrasenia(req: Request, res: Response, next: NextFunction) {
        try {

            let { contrasenia } = req.params;

            if (contrasenia === undefined) {
                contrasenia = req.body.contrasenia;
            }

            if (contrasenia === undefined) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar la contraseña del usuario",
                });
                return;
            }

            if (typeof contrasenia != "string") {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La contraseña proporcionado debe ser de tipo string",
                });
                return;
            }

            // 🔐 Expresión regular para contraseña segura
            // Mínimo 6 caracteres, 1 mayúscula, 1 número, 1 caracter especial
            const regexContrasenia = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

            if (!regexContrasenia.test(contrasenia)) {
                res.status(400).json({
                    code: 400,
                    success: false,
                    data: null,
                    message: "La contraseña no cumple con los requisitos de seguridad (mínimo 6 caracteres, una mayúscula, un número y un carácter especial)",
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
                message: 'Error en la funcion validar_contrasenia: ' + error.message
            });
        }
    }
}