import { UtilAxios } from "../utils/UtilAxios";
import axios from 'axios';
import https from "https";
import util from 'util';
const _UtilAxios = new UtilAxios();

export class ApiLogsService {

    constructor() { }

    private async create_token() {
        let claveDebug = "ApiLogsService.create_token";
        try {
            const config = {
                url: `${global.ENVGLOBAL.SERVICES.API_LOGS.BASE_URI}/logs/connect-token`,
                body: {
                    "api_key": global.ENVGLOBAL.SERVICES.API_LOGS.KEY,
                    "scope": global.ENVGLOBAL.SERVICES.API_LOGS.SCOPE,
                    "secret_key": global.ENVGLOBAL.SERVICES.API_LOGS.SECRET_KEY,
                    "client_id": global.ENVGLOBAL.SERVICES.API_LOGS.CLIENT_ID,
                    "aplicativo_id": global.ENVGLOBAL.SERVICES.API_LOGS.APLICATIVO,
                }
            };

            let token = await axios.post(config.url, config.body).then(function (response: any) {
                if (!response || !response.data) { return null }
                return response.data;
            }).catch(function (error: any) {
                if (error) {
                    console.log(`[${claveDebug}] Ocurrio un error`);
                    return error;
                }
                return null;
            });

            if (!token || !token.data) { return null }

            if (token.data.jwt) { return token.data.jwt }

            return null;

        } catch (error) {
            console.log(claveDebug, error);
            return null;
        }
    }

    public async showLog(texto: string = "", data: any) {
        let claveDebug = "ApiLogsService.showLog";
        console.log(data);
        let body_log: any = {};
        try {
            if (texto == "morgan" && data) {
                body_log.claveDebug = texto;
                body_log.type = "morgan"
                body_log.data = JSON.parse(data);
            } else {
                if (texto && data) {
                    body_log.claveDebug = texto;
                    body_log.data = data;
                } else {
                    if (texto) {
                        body_log.claveDebug = texto;
                    }

                    if (data) {
                        body_log.data = data;
                    }
                }
            }

            // Obtener token
            let token = await this.create_token();
            if (!token) {
                let error = {
                    ubicacion: claveDebug,
                    mensaje: "No se pudo crear el token para guardar el log"
                }
                return null;
            }

            body_log.aplicativo_id = global.ENVGLOBAL.SERVICES.API_LOGS.APLICATIVO;

            const config = {
                url: `${global.ENVGLOBAL.SERVICES.API_LOGS.BASE_URI}/logs/send-live-terminal`,
                headersConfig: {
                    httpsAgent: new https.Agent({ rejectUnauthorized: false, }),
                    headers: {
                        Authorization: token,
                        scope: global.ENVGLOBAL.SERVICES.API_LOGS.SCOPE
                    },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                },
                body: body_log
            }

            const instance = axios.create(config.headersConfig);
            let result = await instance.post(config.url, config.body).then(function (response: any) {
                return response;
            }).catch(function (error: any) {
                if (error) {
                    console.log(`[${claveDebug}] Ocurrio un error`);
                    return error;
                }
                return null;
            });

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async registrar_log(data: any) {
        let claveDebug = "ApiLogsService.registrar_log";
        let respuesta = { msg: "", code: 0, action: claveDebug };
        try {
            //! ESTA OPCION SE ACTIVA O DESACTIVA CON LA VARIABLE DE ENTORNO
            //! API.DEBUG = true / false
            this.mostrar_consola_debug(claveDebug, data); // mostrar logs en terminal
            if (!data) { console.log(`[ ${claveDebug} ] No se recibieron los parametros para registrar el log`); return null; }

            let token = await this.create_token();
            if (!token) { return null; }

            data.aplicativo_id = global.ENVGLOBAL.SERVICES.API_LOGS.APLICATIVO;
            let json = data;
            if (data.ubicacion) { json.ubicacion = data.ubicacion } else { json.ubicacion = `${global.ENVGLOBAL.SERVICES.API_LOGS.NAME} ${claveDebug}` }
            if (data.mensaje) { json.mensaje = data.mensaje } else { json.mensaje = `REGISTRO DE LOG` }

            const config = {
                url: `${global.ENVGLOBAL.SERVICES.API_LOGS.BASE_URI}/logs/register`,
                headersConfig: {
                    httpsAgent: new https.Agent({ rejectUnauthorized: false, }),
                    headers: {
                        Authorization: token,
                        scope: global.ENVGLOBAL.SERVICES.API_LOGS.SCOPE
                    },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                },
                body: json
            }

            const instance = axios.create(config.headersConfig);
            let result = await instance.post(config.url, config.body).then(function (response: any) {
                if (!response) { return null }
                return response;
            }).catch(function (error: any) {
                if (error) {
                    console.log(`[${claveDebug}] Ocurrio un error`);
                    return {
                        code: 404,
                        error: true,
                        msg: _UtilAxios.filtraError(error)
                    }
                }
                return null;
            });

            if (!result) {
                respuesta.msg = "No se pudo registrar el log";
                respuesta.code = 500;
                respuesta.action = claveDebug;
            }

            if (result && result.error) { return result }

            respuesta.msg = "Log registrado correctamente";
            respuesta.code = 200;
            respuesta.action = claveDebug;

            return respuesta;


        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async registrar_log_informativo(data: any) {
        let claveDebug = "ApiLogsService.registrar_log_informativo";
        try {
            data.level = "info"; // se le agrega la etiqueta de categoria
            return this.registrar_log(data);
        } catch (error) {
            return null;
        }
    }

    public async registrar_log_exitoso(data: any) {
        let claveDebug = "ApiLogsService.registrar_log_exitoso";
        try {
            data.level = "success"; // se le agrega la etiqueta de categoria
            return this.registrar_log(data);
        } catch (error) {
            return null;
        }
    }

    public async registrar_log_warning(data: any) {
        let claveDebug = "ApiLogsService.registrar_log_warning";
        try {
            data.level = "warn"; // se le agrega la etiqueta de categoria
            return this.registrar_log(data);
        } catch (error) {
            return null;
        }
    }

    public async registrar_log_error(data: any) {
        let claveDebug = "ApiLogsService.registrar_log_error";
        try {
            data.level = "error"; // se le agrega la etiqueta de categoria
            return this.registrar_log(data);
        } catch (error) {
            return null;
        }
    }

    public async error_toString(err: any) {
        return util.inspect(err, false, null, true);
    }

    public async contar_peticiones(data: any) {
        let claveDebug = "ApiLogsService.contar_peticiones";
    }

    private mostrar_consola_debug(claveDebug: any, data: any) {
        if (global.ENVGLOBAL.API.DEBUG) { this.showLog(claveDebug, data); }
    }

}