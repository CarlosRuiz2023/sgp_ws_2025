// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Firma:any;

const FirmaModel = async () => {

  Firma = dbPostgres.define('firma', {
    id_firma: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_obra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plano:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    fecha_de_firma:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_firmas',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Firma, { foreignKey: 'id_obra' });
  Firma.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(Firma, { foreignKey: 'id_usuario' });
  Firma.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  FirmaModel,
  Firma
}