import type { Request, Response } from "express";

export class UtilRequest {

    public async getParams(req: Request) {
        var params = {};
        if (Object.keys(req.body).length != 0) { // POST
            params = Object.assign(params, req.body);
        }

        if (Object.keys(req.params).length != 0) {  // PARÁMETROS DE LA URL DEFINIDOS EN EL ARCHIVO DE ROUTE
            params = Object.assign(params, req.params);
        }

        if (Object.keys(req.query).length != 0) {  // GET
            params = Object.assign(params, req.query);
        }
        return params;
    }

    public descErrorContactarSoporte() { return "Ocurrió un problema al realizar la solicitud. Por favor comunícate con el equipo de soporte para solucionar el problema" }

}