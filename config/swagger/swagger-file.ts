import { SwaggerObraController } from "./controllers/swagger-obras.controller";
import { SwaggerCooperadorController } from "./controllers/swagger-cooperadores.controller";
import { SwaggerCarteraVencidaController } from "./controllers/swagger-cartera-vencida.controller";
import { SwaggerConeccionesController } from "./controllers/swagger-conecciones.controller";
import { SwaggerActualizacionesController } from "./controllers/swagger-actualizaciones.controller";

var _SwaggerObraController = new SwaggerObraController();
var _SwaggerCooperadorController = new SwaggerCooperadorController();
var _SwaggerCarteraVencidaController = new SwaggerCarteraVencidaController();
var _SwaggerConeccionesController = new SwaggerConeccionesController();
var _SwaggerActualizacionesController = new SwaggerActualizacionesController();

export class SwaggerFile {

    // dar de alta las rutas del mismo tag
    public async loadConfigFile() {
        return {
            "swagger": "2.0",
            "info": {
                "description": `Environment ${global.ENVGLOBAL.API.ENVIRONMENT}`,
                "version": global.ENVGLOBAL.API.VERSION,
                "title": global.ENVGLOBAL.SWAGGER.TITLE,
                "termsOfService": "http://swagger.io/terms/",
                "contact": {
                    "email": global.ENVGLOBAL.SWAGGER.EMAIL
                },
                "license": {
                    "name": "Apache 2.0",
                    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            },
            "host": global.ENVGLOBAL.SWAGGER.HOST,
            "basePath": global.ENVGLOBAL.SWAGGER.BASE_PATH,
            "schemes": [
                "http",
                "https"
            ],
            "tags": [
                _SwaggerObraController.tag,
                _SwaggerCooperadorController.tag,
                _SwaggerCarteraVencidaController.tag,
                _SwaggerConeccionesController.tag,
                _SwaggerActualizacionesController.tag
            ],
            "paths": {
                //OBRAS
                "/obras/access": _SwaggerObraController.getObrasAccess,
                "/obras/access/{obr_clv}": _SwaggerObraController.getObraAccess,
                "/obras/access/agregar": _SwaggerObraController.postObraAccess,
                "/obras/access/actualizar/{obr_clv}": _SwaggerObraController.putObraAccess,
                "/obras/access/cambiarEstatus/{obr_clv}": _SwaggerObraController.putEstatusObraAccess,
                "/obras/access/incrementarCosto/{obr_clv}": _SwaggerObraController.putCostoObraAccess,
                "/obras/access/eliminar/{obr_clv}": _SwaggerObraController.deleteObraAccess,
                "/obras/sql": _SwaggerObraController.getObrasSql,
                "/obras/sql/{obr_clv}": _SwaggerObraController.getObraSql,
                "/obras/sql/agregar": _SwaggerObraController.postObraSql,
                "/obras/sql/actualizar/{obr_clv}": _SwaggerObraController.putObraSql,
                "/obras/sql/cambiarEstatus/{obr_clv}": _SwaggerObraController.putEstatusObraSql,
                "/obras/sql/incrementarCosto/{obr_clv}": _SwaggerObraController.putCostoObraSql,
                "/obras/sql/eliminar/{obr_clv}": _SwaggerObraController.deleteObraSql,

                //COOPERADORES
                "/cooperadores/access/{coo_clv}": _SwaggerCooperadorController.getCooperadoresAccess,
                "/cooperadores/access/agregar": _SwaggerCooperadorController.postCooperadorAccess,
                "/cooperadores/access/actualizar/{coo_clv}": _SwaggerCooperadorController.putCooperadorAccess,
                "/cooperadores/access/eliminar/{coo_clv}": _SwaggerCooperadorController.deleteCooperadorAccess,
                "/cooperadores/sql/{coo_clv}": _SwaggerCooperadorController.getCooperadoresSql,
                "/cooperadores/sql/agregar": _SwaggerCooperadorController.postCooperadorSql,
                "/cooperadores/sql/actualizar/{coo_clv}": _SwaggerCooperadorController.putCooperadorSql,
                "/cooperadores/sql/eliminar/{coo_clv}": _SwaggerCooperadorController.deleteCooperadorSql,

                //CARTERA VENCIDA
                "/carteraVencida/{cta_predial}":_SwaggerCarteraVencidaController.getCarteraVencida,
                "/carteraVencida":_SwaggerCarteraVencidaController.putCarteraVencida,

                //ACTUALIZACIONES A BDS
                "/dbs/actualizar-access-postgresql":_SwaggerActualizacionesController.getActualizarAcceessPostgreSQL,
                "/dbs/actualizar-sql-postgresql":_SwaggerActualizacionesController.getActualizarSQLServer,

                //CONECCIONES DE BDS
                "/coneccion/acceso-a-access":_SwaggerConeccionesController.getConeccionAccess,
                "/coneccion/acceso-a-sql":_SwaggerConeccionesController.getConeccionSql,
                "/coneccion/acceso-a-postgresql":_SwaggerConeccionesController.getConeccionPostgreSQL,
            },
            "externalDocs": {
                "description": "Find out more about Swagger",
                "url": "http://swagger.io"
            }
        }
    }

}