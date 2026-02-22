import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const FamiliaPerdidaRegistro = sequelize.define('FamiliaPerdidaRegistro', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  historial_estado_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  periodo_id: { type: DataTypes.BIGINT },
  grupo_estudiantil_id: { type: DataTypes.BIGINT },
  fecha_registro: { type: DataTypes.DATEONLY, allowNull: false },
  territorio: { type: DataTypes.TEXT, allowNull: false },
  nombre_familia: { type: DataTypes.TEXT, allowNull: false },
  jefe_familia: { type: DataTypes.TEXT },
  telefono_jefe: { type: DataTypes.TEXT },
  causa: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'familia_perdida_registro',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
