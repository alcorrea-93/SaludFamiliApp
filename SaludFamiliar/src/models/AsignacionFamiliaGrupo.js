import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const AsignacionFamiliaGrupo = sequelize.define('AsignacionFamiliaGrupo', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  periodo_id: { type: DataTypes.BIGINT, allowNull: false },
  grupo_id: { type: DataTypes.BIGINT, allowNull: false },
  familia_id: { type: DataTypes.BIGINT, allowNull: false },
  notas: { type: DataTypes.TEXT },
}, {
  tableName: 'asignacion_familia_grupo',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
