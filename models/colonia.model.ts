// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Colonia:any;

const ColoniaModel = async () => {

  Colonia = dbPostgres.define('colonia', {
    id_colonia: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector:{
      type:DataTypes.INTEGER
    },
    subSector:{
      type:DataTypes.INTEGER,
    },
    estatus:{
      type:DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_colonias',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  ColoniaModel,
  Colonia
}