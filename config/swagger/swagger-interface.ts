import { SwaggerFile } from "./swagger-file";
var swaggerDocument = new SwaggerFile();

export class SwaggerInterface {

    public async loadConfigFile() {
        try {
            // si es ambiente de produccion ocultamos el swagger
            if (process.env.NODE_ENV != 'PROD') {
                return await swaggerDocument.loadConfigFile();
            } else {
                return {}
            }
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}