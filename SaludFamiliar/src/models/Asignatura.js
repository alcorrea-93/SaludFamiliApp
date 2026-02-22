import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Asignatura = sequelize.define('Asignatura', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.TEXT, allowNull: false, unique: true },
  nombre: { type: DataTypes.TEXT, allowNull: false },
  creditos: { type: DataTypes.INTEGER },
}, {
  tableName: 'asignatura',
  timestamps: false,
  underscored: true,
});
