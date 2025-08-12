// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Rol:any;

const RolModel = async () => {

  Rol = dbPostgres.define('rol', {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatus:{
      type:DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_roles',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  RolModel,
  Rol
}