// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Comite:any;

const ComiteModel = async () => {

  Comite = dbPostgres.define('comite', {
    id_comite: {
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
    sesion:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    tipo:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    punto:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    costo:{
      type:DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_creacion:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_comites',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Comite, { foreignKey: 'id_obra' });
  Comite.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(Comite, { foreignKey: 'id_usuario' });
  Comite.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  ComiteModel,
  Comite
}