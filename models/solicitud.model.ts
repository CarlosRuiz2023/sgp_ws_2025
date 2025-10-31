// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Solicitud: any;

const SolicitudModel = async () => {

  Solicitud = dbPostgres.define('solicitud', {
    id_solicitud: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_obra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario_solicitud: {
      type: DataTypes.INTEGER,
    },
    id_usuario_laboratorio: {
      type: DataTypes.INTEGER
    },
    id_usuario_ms: {
      type: DataTypes.INTEGER
    },
    solicitud: {
      type: DataTypes.STRING,
    },
    laboratorio: {
      type: DataTypes.STRING
    },
    mecanica_de_suelos: {
      type: DataTypes.STRING
    },
    fecha_solicitud: {
      type: DataTypes.DATE
    },
    fecha_laboratorio: {
      type: DataTypes.DATE
    },
    fecha_ms: {
      type: DataTypes.DATE
    },
    estatus: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_solicitudes',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });

  Obra.hasMany(Solicitud, { foreignKey: 'id_obra', as: 'solicitudes' });
  Solicitud.belongsTo(Obra, { foreignKey: 'id_obra', as: 'obra' });

  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_solicitud', as: 'solicitantes' });
  Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario_solicitud', as: 'solicitante' });

  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_laboratorio', as: 'laboratoristas' });
  Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario_laboratorio', as: 'laboratorista' });

  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_ms', as: 'mecanicos_de_suelos' });
  Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario_ms', as: 'mecanico_de_suelos' });
}
export {
  SolicitudModel,
  Solicitud
}