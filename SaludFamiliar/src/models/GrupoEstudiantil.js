import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const GrupoEstudiantil = sequelize.define('GrupoEstudiantil', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.TEXT, allowNull: false },
  codigo: { type: DataTypes.TEXT },
}, {
  tableName: 'grupo_estudiantil',
  timestamps: false,
  underscored: true,
});
