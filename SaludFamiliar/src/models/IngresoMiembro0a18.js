import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/** Solo campos específicos 0-18 años (Option A). Comunes en IngresoFamiliaMiembro. */
export const IngresoMiembro0a18 = sequelize.define('IngresoMiembro0a18', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  miembro_ingreso_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  lm_exclusiva: { type: DataTypes.BOOLEAN },
  lm_exclusiva_meses: { type: DataTypes.INTEGER },
  progr_crec_desarrollo: { type: DataTypes.BOOLEAN },
  eda_en_semestre: { type: DataTypes.BOOLEAN },
  eda_num_episodios: { type: DataTypes.INTEGER },
  eda_sabe_manejo: { type: DataTypes.BOOLEAN },
  ira_en_semestre: { type: DataTypes.BOOLEAN },
  ira_num_episodios: { type: DataTypes.INTEGER },
  ira_sabe_manejo: { type: DataTypes.BOOLEAN },
}, {
  tableName: 'ingreso_miembro_0a18',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false,
  underscored: true,
});
