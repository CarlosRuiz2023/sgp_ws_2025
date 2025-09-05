import { Router } from 'express';
const api: Router = Router();

import { UploadInterface } from '../interfaces/upload.interface';
const _Upload_Interface = new UploadInterface();

api.post('/',_Upload_Interface.cargarArchivo);
api.get('/:coleccion/:id',_Upload_Interface.mostrarArchivo);
api.post('/:coleccion/:id',_Upload_Interface.actualizarArchivo);

export default api;