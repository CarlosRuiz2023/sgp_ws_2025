// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let OficioSapal:any;

const OficioSapalModel = async () => {

  OficioSapal = dbPostgres.define('oficio_sapal', {
    id_oficio_sapal: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario_sapal: {
      type: DataTypes.INTEGER,
    },
    id_obra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oficio_de_recibido:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    observaciones:{
      type:DataTypes.STRING
    },
    oficio_de_revision:{
      type:DataTypes.STRING
    },
    fecha_de_entrega:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_oficio_sapal',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(OficioSapal, { foreignKey: 'id_obra' });
  OficioSapal.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(OficioSapal, { foreignKey: 'id_usuario' });
  Usuario.hasMany(OficioSapal, { foreignKey: 'id_usuario_sapal' });
  OficioSapal.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  OficioSapalModel,
  OficioSapal
}