import { Router } from 'express';
const api: Router = Router();

import { EmailInterface } from '../interfaces/email.interface';

const _Email_Interface = new EmailInterface();

api.post('/enviarCorreoInformativo',_Email_Interface.enviarCorreoInformativo);

export default api;

