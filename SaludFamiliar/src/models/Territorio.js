import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Territorio = sequelize.define('Territorio', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.TEXT, allowNull: false },
  departamento: { type: DataTypes.TEXT },
  municipio: { type: DataTypes.TEXT },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'territorio',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
