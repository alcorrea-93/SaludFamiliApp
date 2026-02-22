import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const EstadoFamilia = sequelize.define('EstadoFamilia', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.TEXT, allowNull: false, unique: true },
  nombre: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'estado_familia',
  timestamps: false,
  underscored: true,
});
