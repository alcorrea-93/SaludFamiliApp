import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/** Solo campos específicos 19-44 años (Option A). Comunes en IngresoFamiliaMiembro. */
export const IngresoMiembro19a44 = sequelize.define('IngresoMiembro19a44', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  miembro_ingreso_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  /* Específicos 19-44: citología y autoexamen ya en IngresoFamiliaMiembro; aquí solo extras si los hubiera */
  observaciones_adicionales: { type: DataTypes.TEXT },
}, {
  tableName: 'ingreso_miembro_19a44',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
