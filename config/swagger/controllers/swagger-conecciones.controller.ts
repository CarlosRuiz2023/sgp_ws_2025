export class SwaggerConeccionesController {
    tag: any = {
        name: "conecciones",
        description: "Operaciones relacionadas con la coneccion a las diferentes BDs de la API REST"
    };

    public getConeccionAccess = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener coneccion actual a access",
            operationId: "getConeccionAccess",
            responses: {
                200: { description: "Respuesta de la coneccion" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getConeccionSql = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener coneccion actual a sql",
            operationId: "getConeccionSql",
            responses: {
                200: { description: "Respuesta de la coneccion" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getConeccionPostgreSQL = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener coneccion actual a postgreSQL",
            operationId: "getConeccionPostgreSQL",
            responses: {
                200: { description: "Respuesta de la coneccion" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

}
