export class SwaggerCarteraVencidaController {
    tag: any = {
        name: "cartera vencida",
        description: "Operaciones relacionadas con la cartera vencida de Sql"
    };

    public getCarteraVencida = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener cartera vencida por cuenta predial Sql",
            operationId: "getCarteraVencida",
            parameters: [
                {
                    name: "cta_predial",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Cuenta predial única de la cartera vencida a buscar",
                    default:"01BC04858022"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{cta_predial}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cartera vencida encontrada" },
                404: { description: "Cartera vencida no encontrada" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putCarteraVencida = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar cartera vencida (Sql)",
            operationId: "putCarteraVencida",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la cartera vencida",
                    required: true,
                    schema: {
                        properties: {
                            saldosin: {
                                type: "double",
                                description: "Deuda del cooperador sin recargos",
                                default:112.3
                            },
                            saldocon: {
                                type: "double",
                                description: "Deuda del cooperador con recargos",
                                default:115.3
                            },
                            incremento: {
                                type: "double",
                                description: "Incremento de la deuda del cooperador",
                                default:100.56
                            },
                            cta_predial: {
                                type: "string",
                                description: "Cuenta predial del cooperador",
                                default:"01BC04858024"
                            },
                        },
                        required: ["saldosin","saldocon","incremento","cta_predial"]
                    }
                }
            ],
            responses: {
                200: { description: "Cartera vencida actualizada exitosamente" },
                404: { description: "Cartera vencida no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

}
