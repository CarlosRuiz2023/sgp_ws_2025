// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Solicitud:any;

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
      allowNull: false,
    },
    id_usuario_laboratorio:{
      type:DataTypes.INTEGER
    },
    id_usuario_ms:{
      type:DataTypes.INTEGER
    },
    solicitud:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    laboratorio:{
      type:DataTypes.STRING
    },
    mecanica_de_suelos:{
      type:DataTypes.STRING
    },
    fecha_solicitud:{
      type:DataTypes.DATE
    },
    fecha_laboratorio:{
      type:DataTypes.DATE
    },
    fecha_ms:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_solicitudes',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Solicitud, { foreignKey: 'id_obra' });
  Solicitud.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_solicitud' });
  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_laboratorio' });
  Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario_ms' });
  Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  SolicitudModel,
  Solicitud
}