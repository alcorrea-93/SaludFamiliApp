import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/** Solo campos específicos 45+ años (Option A). Comunes en IngresoFamiliaMiembro. */
export const IngresoMiembro45Mas = sequelize.define('IngresoMiembro45Mas', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  miembro_ingreso_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  /* Específicos 45+: mamografía y próstata ya en IngresoFamiliaMiembro; aquí solo extras si los hubiera */
  observaciones_adicionales: { type: DataTypes.TEXT },
}, {
  tableName: 'ingreso_miembro_45mas',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
