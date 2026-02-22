import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const IntegranteFamilia = sequelize.define('IntegranteFamilia', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  nombres: { type: DataTypes.TEXT, allowNull: false },
  apellidos: { type: DataTypes.TEXT, allowNull: false },
  documento_tipo: { type: DataTypes.TEXT },
  documento_numero: { type: DataTypes.TEXT },
  fecha_nacimiento: { type: DataTypes.DATEONLY },
  telefono: { type: DataTypes.TEXT },
  correo: { type: DataTypes.TEXT },
  es_jefe: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  eps: { type: DataTypes.TEXT },
  sisben: { type: DataTypes.TEXT },
  enfermedad: { type: DataTypes.TEXT },
  enfermedad_codigo: { type: DataTypes.TEXT },
}, {
  tableName: 'integrante_familia',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
