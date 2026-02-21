import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const IngresoFamilia = sequelize.define('IngresoFamilia', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  periodo_id: { type: DataTypes.BIGINT, allowNull: false },
  fecha_ingreso: { type: DataTypes.DATEONLY, allowNull: false },
  observaciones_docente: { type: DataTypes.TEXT },
  aspectos_trabajados: { type: DataTypes.TEXT },
  temas_a_trabajar: { type: DataTypes.TEXT },
}, {
  tableName: 'ingreso_familia',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
