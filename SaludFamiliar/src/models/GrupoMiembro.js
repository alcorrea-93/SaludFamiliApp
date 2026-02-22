import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const GrupoMiembro = sequelize.define('GrupoMiembro', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  periodo_id: { type: DataTypes.BIGINT, allowNull: false },
  grupo_id: { type: DataTypes.BIGINT, allowNull: false },
  estudiante_id: { type: DataTypes.BIGINT, allowNull: false },
  rol: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'INTEGRANTE' },
}, {
  tableName: 'grupo_miembro',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
