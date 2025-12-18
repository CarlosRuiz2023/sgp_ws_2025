import { Sequelize } from 'sequelize';

import { UsuarioModel } from '../../models/usuario.model';
import { RolModel } from '../../models/rol.model';
import { EmpresaModel } from '../../models/empresa.model';
import { ModuloModel } from '../../models/modulo.model';
import { PermisoModel } from '../../models/permiso.model';
import { ModuloPermisoModel } from '../../models/modulo_permiso.model';
import { AccesoModel } from '../../models/acceso.model';
import { ColoniaModel } from '../../models/colonia.model';
import { ObraModel } from '../../models/obra.model';
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
    host: process.env.POSTGRESQL_HOST || 'aws-0-us-west-2.pooler.supabase.com',
    port: Number(process.env.POSTGRESQL_PORT) || 6543,
    database: process.env.POSTGRESQL_DATABASE || 'postgres',
    username: process.env.POSTGRESQL_USER_NAME || 'postgres.ygsmdqeaaztpnagtviao',
    password: process.env.POSTGRESQL_USER_PASSWORD || 'Ezequielpitufo1*',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
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
