import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const IngresoViviendaAnimal = sequelize.define('IngresoViviendaAnimal', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  ingreso_vivienda_id: { type: DataTypes.BIGINT, allowNull: false },
  tipo: { type: DataTypes.TEXT, allowNull: false },
  descripcion_otro: { type: DataTypes.TEXT },
  tiene: { type: DataTypes.BOOLEAN },
  cantidad: { type: DataTypes.INTEGER },
  vacunados: { type: DataTypes.INTEGER },
  esterilizados: { type: DataTypes.INTEGER },
  desparasitados: { type: DataTypes.INTEGER },
}, {
  tableName: 'ingreso_vivienda_animal',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
