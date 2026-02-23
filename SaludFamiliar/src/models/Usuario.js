import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  nombre_completo: { type: DataTypes.TEXT, allowNull: false },
  correo: { type: DataTypes.TEXT, allowNull: false, unique: true },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  rol_id: { type: DataTypes.BIGINT, allowNull: false },
  profesor_id: { type: DataTypes.BIGINT },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  ultimo_login: { type: DataTypes.DATE },
}, {
  tableName: 'usuario',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password_hash'] },
  },
  scopes: {
    withPassword: { attributes: {} },
  },
});
