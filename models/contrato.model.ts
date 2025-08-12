// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Contrato:any;

const ContratoModel = async () => {

  Contrato = dbPostgres.define('contrato', {
    id_contrato: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario_contratista: {
      type: DataTypes.INTEGER
    },
    id_usuario_supervisor:{
      type:DataTypes.INTEGER
    },
    id_obra:{
      type:DataTypes.INTEGER
    },
    costo_real:{
      type:DataTypes.BOOLEAN
    },
    fecha_inicio:{
      type:DataTypes.DATE
    },
    fecha_termino:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_contratos',
    schema: 'public',
    timestamps: true // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Contrato, { foreignKey: 'id_obra' });
  Contrato.belongsTo(Obra, { foreignKey: 'id_obra' });

  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario_contratista' });
  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario_supervisor' });
  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario' });
  Contrato.belongsTo(Usuario, { foreignKey: 'id_usuario' });
}
export{
  ContratoModel,
  Contrato
}