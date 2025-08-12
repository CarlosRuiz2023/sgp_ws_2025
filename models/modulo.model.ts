// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Modulo:any;

const ModuloModel = async () => {

  Modulo = dbPostgres.define('modulo', {
    id_modulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    modulo:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    estatus:{
      type:DataTypes.INTEGER
    }
  }, {
    tableName: 'tbl_modulos',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ModuloModel,
  Modulo
}