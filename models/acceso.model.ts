// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Usuario } from './usuario.model';
let Acceso:any;

const AccesoModel = async () => {

  Acceso = dbPostgres.define('acceso', {
    id_acceso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_hora: {
      type: DataTypes.DATE
    },
    exitoso:{
      type:DataTypes.BOOLEAN
    },
  }, {
    tableName: 'tbl_accesos',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
  Usuario.hasMany(Acceso, { foreignKey: 'id_usuario' });
  Acceso.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  AccesoModel,
  Acceso
}