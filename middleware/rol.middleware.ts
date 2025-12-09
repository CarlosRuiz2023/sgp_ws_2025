import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Rol } from "../models/rol.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class RolMiddleware {

    public async validar_id_rol(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_rol } = req.params;

            if (id_rol === undefined) {
                id_rol = req.body.id_rol;
            }

            if (id_rol === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_rol",
                });
                return;
            }

            if (typeof Number(id_rol) != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_rol proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const rol = await Rol.findByPk(Number(id_rol));
            if (rol.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_rol proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if(rol.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El rol con el id_rol proporcionado se encuentra inactivo",
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
                message: 'Error en la funcion validar_id_rol: '+error.message
            });
        }
    }
}