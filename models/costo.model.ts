// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Costo:any;

const CostoModel = async () => {

  Costo = dbPostgres.define('costo', {
    id_costo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    metros: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ancho: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    costo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estatus:{
      type:DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_costos',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  CostoModel,
  Costo
}