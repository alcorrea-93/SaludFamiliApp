import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const HistorialEstadoFamilia = sequelize.define('HistorialEstadoFamilia', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  estado_id: { type: DataTypes.BIGINT, allowNull: false },
  fecha_desde: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_hasta: { type: DataTypes.DATEONLY },
  creado_por: { type: DataTypes.TEXT },
  observaciones: { type: DataTypes.TEXT },
}, {
  tableName: 'historial_estado_familia',
  timestamps: false,
  underscored: true,
});
