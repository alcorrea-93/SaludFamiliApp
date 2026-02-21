import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Familia = sequelize.define('Familia', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  vereda_id: { type: DataTypes.BIGINT, allowNull: false },
  nombre_familia: { type: DataTypes.TEXT, allowNull: false },
  jefe_integrante_id: { type: DataTypes.BIGINT },
  telefono_contacto: { type: DataTypes.TEXT },
  observaciones: { type: DataTypes.TEXT },
}, {
  tableName: 'familia',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
