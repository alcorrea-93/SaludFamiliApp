import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const SeguimientoParticipante = sequelize.define('SeguimientoParticipante', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  seguimiento_id: { type: DataTypes.BIGINT, allowNull: false },
  estudiante_id: { type: DataTypes.BIGINT, allowNull: false },
  rol: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'ACTIVO' },
}, {
  tableName: 'seguimiento_participante',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
