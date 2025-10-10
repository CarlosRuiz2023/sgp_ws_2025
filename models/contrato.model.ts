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
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Contrato, { foreignKey: 'id_obra', as : 'contratos' });
  Contrato.belongsTo(Obra, { foreignKey: 'id_obra', as : 'obra' });

  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario', as : 'contratos' });
  Contrato.belongsTo(Usuario, { foreignKey: 'id_usuario', as : 'usuario' });

  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario', as : 'contratistas' });
  Contrato.belongsTo(Usuario, { foreignKey: 'id_usuario_contratista', as : 'contratista' });

  Usuario.hasMany(Contrato, { foreignKey: 'id_usuario', as : 'supervisores' });
  Contrato.belongsTo(Usuario, { foreignKey: 'id_usuario_supervisor', as : 'supervisor' });
  
}
export{
  ContratoModel,
  Contrato
}