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
import { ComiteModel } from '../../models/comite.model';
import { EstimacionModel } from '../../models/estimacion.model';
import { ContratoModel } from '../../models/contrato.model';
import { SolicitudModel } from '../../models/solicitud.model';
import { OficioSapalModel } from '../../models/oficioSapal.model';
import { EntregaModel } from '../../models/entrega.model';
import { FirmaModel } from '../../models/firma.model';

let dbPostgres: Sequelize;

const initConnections = async () => {
  dbPostgres = new Sequelize({
    dialect: "postgres",
    host: global.ENVGLOBAL.POSTGRESQL_HOST || 'db.ygsmdqeaaztpnagtviao.supabase.co',
    port: Number(global.ENVGLOBAL.POSTGRESQL_PORT) || 5432,
    database: global.ENVGLOBAL.POSTGRESQL_DATABASE || 'postgres',
    username: global.ENVGLOBAL.POSTGRESQL_USER_NAME || 'postgres',
    password: global.ENVGLOBAL.POSTGRESQL_USER_PASSWORD || 'Ezequielpitufo1*',
    /* dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }*/
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
  ComiteModel();
  EstimacionModel();
  ContratoModel();
  SolicitudModel();
  OficioSapalModel();
  EntregaModel();
  FirmaModel();

  // Establecer las asociaciones entre los modelos si es necesario
  // Por ejemplo: UsuarioModel.belongsTo(RolModel, { foreignKey: 'id_rol' });

  console.log("Conexiones inicializadas correctamente.");
};

export {
  initConnections,
  dbPostgres,
};
