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
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Firma, { foreignKey: 'id_obra', as : 'firmas' });
  Firma.belongsTo(Obra, { foreignKey: 'id_obra', as : 'obra' });

  Usuario.hasMany(Firma, { foreignKey: 'id_usuario', as : 'firmadores' });
  Firma.belongsTo(Usuario, { foreignKey: 'id_usuario', as : 'firmador' });
}
export{
  FirmaModel,
  Firma
}