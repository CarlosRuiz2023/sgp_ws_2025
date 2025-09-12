import { Rol } from "../models/rol.model";

export class RolController {

  public async obtenerRol(data: any) {
    const params = await data;
    const { id_rol } = params;
    const rol = await Rol.findByPk(id_rol, { where: { estatus: 1 } });
    return rol;
  }

  public async obtenerRoles() {
    const roles = await Rol.findAndCountAll({ where: { estatus: 1 }, order: [['rol', 'ASC']] });
    return { roles };
  }
}