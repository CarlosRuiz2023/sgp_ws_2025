import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.model";
export class UtilJwt {
    public generarJWT(id_usuario: number = 1) {
        try {
            const payload = { id_usuario };
            const token = jwt.sign(
                payload,
                process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913",
                { expiresIn: "4h" }
            );
            return token;
        } catch (error) {
            console.log(error);
            return "";
        }
    }
    public async comprobarJWT(req: Request | any, res: Response, next: NextFunction) {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({
                ok: false,
                results: {
                    msg: "No hay token en la peticion",
                },
            });
        }

        try {
            const payload = jwt.verify(
                token,
                process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913"
            );
            const { id_usuario }: any = payload;

            const usuario = await Usuario.findByPk(id_usuario);

            if (!usuario) {
                return res.status(401).json({
                    ok: false,
                    results: {
                        msg: "Token no valido - usuario no existe DB",
                    },
                });
            }

            if (usuario.estatus !== 1) {
                return res.status(401).json({
                    ok: false,
                    results: {
                        msg: "Token no valido - usuario inactivo",
                    },
                });
            }

            req.body.usuario = usuario;
            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                results: {
                    msg: "Token no valido",
                },
            });
        }
    }
}