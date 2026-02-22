import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Vereda = sequelize.define('Vereda', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  territorio_id: { type: DataTypes.BIGINT, allowNull: false },
  nombre: { type: DataTypes.TEXT, allowNull: false },
  activa: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'vereda',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
