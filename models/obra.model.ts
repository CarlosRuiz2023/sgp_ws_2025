// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Colonia } from './colonia.model';
let Obra:any;

const ObraModel = async () => {

  Obra = dbPostgres.define('obra', {
    id_obra: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_colonia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING
    },
    traza_du:{
      type:DataTypes.STRING
    },
    tramo:{
      type:DataTypes.STRING
    },
    finiquito:{
      type:DataTypes.FLOAT
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_obras',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Colonia.hasMany(Obra, { foreignKey: 'id_colonia', as: 'obras' });
  Obra.belongsTo(Colonia, { foreignKey: 'id_colonia', as : 'colonia' });
}
export{
  ObraModel,
  Obra
}