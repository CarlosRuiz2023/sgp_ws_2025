// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Permiso:any;

const PermisoModel = async () => {

  Permiso = dbPostgres.define('permiso', {
    id_permiso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    permiso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatus:{
      type:DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_permisos',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  PermisoModel,
  Permiso
}