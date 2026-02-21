import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PeriodoAcademico = sequelize.define('PeriodoAcademico', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  anio: { type: DataTypes.INTEGER, allowNull: false },
  semestre: { type: DataTypes.INTEGER, allowNull: false },
  codigo: { type: DataTypes.TEXT, allowNull: false, unique: true },
  fecha_inicio: { type: DataTypes.DATEONLY },
  fecha_fin: { type: DataTypes.DATEONLY },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  tableName: 'periodo_academico',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
});
