// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Rol } from './rol.model';
import { Empresa } from './empresa.model';
let Usuario:any;

const UsuarioModel = async () => {

  Usuario = dbPostgres.define('usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombres:{
      type:DataTypes.STRING
    },
    apellido_paterno:{
      type:DataTypes.STRING,
    },
    apellido_materno:{
      type:DataTypes.STRING
    },
    correo:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    contrasenia:{
      type:DataTypes.TEXT,
      allowNull: false,
    },
    contrasenia_visible:{
      type:DataTypes.TEXT,
      allowNull: false,
    },
    token:{
      type:DataTypes.TEXT,
    },
    estatus:{
      type:DataTypes.INTEGER
    }
  }, {
    tableName: 'tbl_usuarios',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });

  Rol.hasMany(Usuario,{foreignKey:'id_rol'});
  Usuario.belongsTo(Rol,{foreignKey:'id_rol'});
  
  Empresa.hasMany(Usuario,{foreignKey:'id_empresa'});
  Usuario.belongsTo(Empresa,{foreignKey:'id_empresa'});
}
export{
  UsuarioModel,
  Usuario
}