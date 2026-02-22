import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Profesor = sequelize.define('Profesor', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  nombres: { type: DataTypes.TEXT, allowNull: false },
  apellidos: { type: DataTypes.TEXT, allowNull: false },
  documento_tipo: { type: DataTypes.TEXT },
  documento_numero: { type: DataTypes.TEXT },
  correo: { type: DataTypes.TEXT },
  telefono: { type: DataTypes.TEXT },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'profesor',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
