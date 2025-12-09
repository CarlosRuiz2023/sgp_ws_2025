import type { Request, Response, NextFunction } from "express";
import { UtilLogError } from "../utils/UtilLogError";
import { Empresa } from "../models/empresa.model";
const UTIL_LOG_ERROR = new UtilLogError();

export class EmpresaMiddleware {

    public async validar_id_empresa(req: Request, res: Response, next: NextFunction) {
        try {

            let { id_empresa } = req.params;

            if (id_empresa === undefined) {
                id_empresa = req.body.id_empresa;
            }

            if (id_empresa === undefined) {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "Falto proporcionar el id_empresa",
                });
                return;
            }

            if (typeof Number(id_empresa) != "number") {
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "El id_empresa proporcionado debe ser de tipo numerico",
                });
                return;
            }

            const empresa = await Empresa.findByPk(Number(id_empresa));
            if (empresa.length === 0) {
                res.status(404).json({
                    code:404,
                    success: false,
                    data: null,
                    message: "El id_empresa proporcionado no existe dentro de la base de datos",
                });
                return;
            }

            if(empresa.estatus === 0){
                res.status(400).json({
                    code:400,
                    success: false,
                    data: null,
                    message: "La empresa con el id_empresa proporcionado se encuentra inactiva",
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
                message: 'Error en la funcion validar_id_empresa: '+error.message
            });
        }
    }
}