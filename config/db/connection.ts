import { Sequelize } from 'sequelize';

import { UsuarioModel } from '../../models/usuario.model';
import { RolModel } from '../../models/rol.model';
import { EmpresaModel } from '../../models/empresa.model';
import { ModuloModel } from '../../models/modulo.model';
import { PermisoModel } from '../../models/permiso.model';
import { ModuloPermisoModel } from '../../models/modulo_permiso.model';
import { AccesoModel } from '../../models/acceso.model';
import { ColoniaModel } from '../../models/colonia.model';
import { ObraModel} from '../../models/obra.model';

let dbPostgres: Sequelize;

const initConnections = async () => {
  dbPostgres = new Sequelize({
    dialect: "postgres",
    host: global.ENVGLOBAL.POSTGRESQL.HOST || 'localhost',
    port: Number(global.ENVGLOBAL.POSTGRESQL.PORT) || 5432,
    database: global.ENVGLOBAL.POSTGRESQL.DATABASE || 'sgp',
    username: global.ENVGLOBAL.POSTGRESQL.USER_NAME || 'postgres',
    password: global.ENVGLOBAL.POSTGRESQL.USER_PASSWORD || 'root',
  });
  
  RolModel();
  EmpresaModel();
  UsuarioModel();
  ModuloModel();
  PermisoModel();
  ModuloPermisoModel();
  AccesoModel();
  ColoniaModel();
  ObraModel();

  console.log("Conexiones inicializadas correctamente.");
};

export {
  initConnections,
  dbPostgres,
};
