import { Router } from 'express';
const api: Router = Router();

import { ObraInterface } from '../interfaces/obra.interface';
const _Obra_Interface = new ObraInterface();

api.get('/',_Obra_Interface.obtenerObras);
api.get('/:id_obra',_Obra_Interface.obtenerObra);
api.post('/',_Obra_Interface.agregarObra);
api.put('/:id_obra',_Obra_Interface.actualizarObra);
api.delete('/:id_obra',_Obra_Interface.eliminarObra);
api.put('/activar/:id_obra',_Obra_Interface.activarObra);

export default api;