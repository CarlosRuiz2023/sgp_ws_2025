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
    public async comprobarJWT(res: Response, req: Request | any, next: NextFunction) {
        const token = req.rawHeaders[1];

        if (!token) {
            return res.status(400).json({
                ok: false,
                results: {
                    msg: "No hay token en la peticion",
                },
            });
        }

        try {
            const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913");
            const { id_usuario }: any = payload;

            //leer el usuario que corresponde al uid
            const usuario = await Usuario.findByPk(id_usuario);

            if (!usuario) {
                console.log("Token no valido - usuario no existe DB");
                return res.status(401).json({
                    ok: false,
                    results: {
                        msg: "Token no valido",
                    },
                });
            }

            //Verificar si el uid tiene estado en true
            if (usuario.estatus !== 1) {
                console.log("Token no valido - estatus del usuario no activo");
                return res.status(401).json({
                    ok: false,
                    results: {
                        msg: "Token no valido - usuario con estatus:false",
                    },
                });
            }

            req.body.usuario = usuario;
            next();
        } catch (error) {
            //console.log(error);
            res.status(401).json({
                ok: false,
                results: {
                    msg: "Token no valido",
                },
            });
        }
    }
}