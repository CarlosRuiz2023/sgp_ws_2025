// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Obra } from './obra.model';
import { Usuario } from './usuario.model';
let Entrega:any;

const EntregaModel = async () => {

  Entrega = dbPostgres.define('entrega', {
    id_entrega: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_obra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario_fisico: {
      type: DataTypes.INTEGER,
    },
    id_usuario_administrativo: {
      type: DataTypes.INTEGER,
    },
    oficio_fisica:{
      type:DataTypes.STRING,
    },
    oficio_administrativa:{
      type:DataTypes.STRING,
    },
    acta_fisica:{
      type:DataTypes.STRING,
    },
    acta_administrativa:{
      type:DataTypes.STRING,
    },
    fecha_fisica:{
      type:DataTypes.DATE
    },
    fecha_administrativa:{
      type:DataTypes.DATE
    },
    estatus:{
      type:DataTypes.INTEGER
    },
  }, {
    tableName: 'tbl_entregas',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
  Obra.hasMany(Entrega, { foreignKey: 'id_obra', as : 'entregas' });
  Entrega.belongsTo(Obra, { foreignKey: 'id_obra', as : 'obra' });

  Usuario.hasMany(Entrega, { foreignKey: 'id_usuario_fisico', as : 'fisicos' });
  Entrega.belongsTo(Usuario, { foreignKey: 'id_usuario_fisico', as : 'fisico' });

  Usuario.hasMany(Entrega, { foreignKey: 'id_usuario_administrativo', as : 'administrativos' });
  Entrega.belongsTo(Usuario, { foreignKey: 'id_usuario_administrativo', as : 'administrativo' });
}
export{
  EntregaModel,
  Entrega
}