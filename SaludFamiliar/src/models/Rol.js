import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Rol = sequelize.define('Rol', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.TEXT, allowNull: false, unique: true },
  nombre: { type: DataTypes.TEXT, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
}, {
  tableName: 'rol',
  timestamps: false,
  underscored: true,
});
