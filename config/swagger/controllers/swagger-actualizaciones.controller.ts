export class SwaggerActualizacionesController {
    tag: any = {
        name: "actualizaciones",
        description: "Operaciones relacionadas con la actualizacion de las distintas BDs"
    };

    public getActualizarAcceessPostgreSQL = {
        get: {
            tags: [this.tag.name],
            summary: "Actualiza las BDs de Access y PostgreSQL",
            operationId: "getActualizarAcceessPostgreSQL",
            responses: {
                200: { description: "Respuesta de la coneccion" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getActualizarSQLServer = {
        get: {
            tags: [this.tag.name],
            summary: "Actualiza la BD se sql comparando registros con PostgreSQL",
            operationId: "getActualizarSQLServer",
            responses: {
                200: { description: "Respuesta de la coneccion" },
                500: { description: "Error interno del servidor" }
            }
        }
    };
}
