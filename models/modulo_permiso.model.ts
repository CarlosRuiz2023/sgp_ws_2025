// models/Obra.ts
import { DataTypes } from 'sequelize';
import { dbPostgres } from '../config/db/connection';
import { Modulo } from './modulo.model';
import { Permiso } from './permiso.model';
import { Rol } from './rol.model';
let ModuloPermiso:any;

const ModuloPermisoModel = async () => {

  ModuloPermiso = dbPostgres.define('modulo_permiso', {
    id_modulo_permiso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_modulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_rol:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'tbl_modulos_permisos',
    schema: 'public',
    timestamps: false // si tu tabla no usa createdAt / updatedAt
  });
  
  Modulo.hasMany(ModuloPermiso,{foreignKey:'id_modulo'});
  ModuloPermiso.belongsTo(Modulo,{foreignKey:'id_modulo'});

  Permiso.hasMany(ModuloPermiso,{foreignKey:'id_permiso'});
  ModuloPermiso.belongsTo(Permiso,{foreignKey:'id_permiso'});

  Rol.hasMany(ModuloPermiso,{foreignKey:'id_rol'});
  ModuloPermiso.belongsTo(Rol,{foreignKey:'id_rol'});
}
export{
  ModuloPermisoModel,
  ModuloPermiso
}