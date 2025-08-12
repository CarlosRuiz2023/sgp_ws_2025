// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
let Empresa:any;

const EmpresaModel = async () => {

  Empresa = dbPostgres.define('empresa', {
    id_empresa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatus:{
      type:DataTypes.INTEGER
    }
  }, {
    tableName: 'tbl_empresas',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
}
export{
  EmpresaModel,
  Empresa
}