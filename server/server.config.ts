import http from 'http';
import express from 'express';
import colors from '../utils/colors.utils';

const color = colors();

export default class ExpressInstanceServer {

    // Patron Singleton
    private static _instance: ExpressInstanceServer;
    // Express API Server
    public httpServer: http.Server;
    public api: express.Application;
    public ENV: any;
    
    // Socket Server
    //public io: Server

    private constructor(ENV:any) {
        this.api = express();
        this.ENV = ENV;
        this.httpServer = http.createServer(this.api);
        /*
        //CONFIGURACION CON SOCKET
        this.io = new socket.Server(this.httpServer, {
            cors: {
                origin: whiteList,
                credentials: true
            }
        });*/
    }

    public static getInstance(ENV: any) {
        return this._instance || (this._instance = new this(ENV));
    }

    start(callback: Function) {
        this.httpServer.listen(this.ENV.API.PORT, callback());
        console.log(`${color.express(`Server: Corriendo en el puerto ${this.ENV.API.PORT}`)}`);
        console.log(`${color.express(`Ambiente: ${this.ENV.API.ENVIRONMENT}`)}`);
    }

};
