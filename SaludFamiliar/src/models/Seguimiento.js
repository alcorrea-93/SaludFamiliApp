import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Seguimiento = sequelize.define('Seguimiento', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  periodo_id: { type: DataTypes.BIGINT, allowNull: false },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  grupo_id: { type: DataTypes.BIGINT, allowNull: false },
  profesor_id: { type: DataTypes.BIGINT, allowNull: false },
  fecha_seguimiento: { type: DataTypes.DATEONLY, allowNull: false },
  observaciones_docente: { type: DataTypes.TEXT },
  aspectos_trabajados: { type: DataTypes.TEXT },
  temas_a_trabajar: { type: DataTypes.TEXT },
}, {
  tableName: 'seguimiento',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
