import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ProfesorAsignado = sequelize.define('ProfesorAsignado', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  periodo_id: { type: DataTypes.BIGINT, allowNull: false },
  grupo_id: { type: DataTypes.BIGINT, allowNull: false },
  profesor_id: { type: DataTypes.BIGINT, allowNull: false },
}, {
  tableName: 'profesor_asignado',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
