// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Estimacion:any;

const EstimacionModel = async () => {

  Estimacion = dbPostgres.define('estimacion', {
    id_estimacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_obra: {
      type: DataTypes.INTEGER
    },
    estimacion:{
      type:DataTypes.STRING
    },
    finiquito:{
      type:DataTypes.BOOLEAN
    },
    avance_fisico:{
      type:DataTypes.FLOAT
    },
    avance_financiero:{
      type:DataTypes.FLOAT
    },
    actual:{
      type:DataTypes.FLOAT
    },
    anterior:{
      type:DataTypes.FLOAT
    },
    fecha_creacion:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_estimaciones',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Estimacion, { foreignKey: 'id_obra' });
  Estimacion.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(Estimacion, { foreignKey: 'id_usuario' });
  Estimacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  EstimacionModel,
  Estimacion
}