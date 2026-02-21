import { sequelize } from '../config/database.js';
import { Familia } from './Familia.js';
import { PeriodoAcademico } from './PeriodoAcademico.js';
import { IngresoFamilia } from './IngresoFamilia.js';
import { IngresoVivienda } from './IngresoVivienda.js';
import { IngresoViviendaAnimal } from './IngresoViviendaAnimal.js';
import { IngresoFamiliaMiembro } from './IngresoFamiliaMiembro.js';
import { IngresoMiembro0a18 } from './IngresoMiembro0a18.js';
import { IngresoMiembro19a44 } from './IngresoMiembro19a44.js';
import { IngresoMiembro45Mas } from './IngresoMiembro45Mas.js';
import { IngresoMiembroGestante } from './IngresoMiembroGestante.js';

/* IngresoFamilia */
IngresoFamilia.belongsTo(Familia, { foreignKey: 'familia_id' });
IngresoFamilia.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
Familia.hasMany(IngresoFamilia, { foreignKey: 'familia_id' });
PeriodoAcademico.hasMany(IngresoFamilia, { foreignKey: 'periodo_id' });

/* IngresoVivienda -> IngresoFamilia */
IngresoVivienda.belongsTo(IngresoFamilia, { foreignKey: 'ingreso_id' });
IngresoFamilia.hasOne(IngresoVivienda, { foreignKey: 'ingreso_id' });

/* IngresoViviendaAnimal -> IngresoVivienda */
IngresoViviendaAnimal.belongsTo(IngresoVivienda, { foreignKey: 'ingreso_vivienda_id' });
IngresoVivienda.hasMany(IngresoViviendaAnimal, { foreignKey: 'ingreso_vivienda_id' });

/* IngresoFamiliaMiembro -> IngresoFamilia */
IngresoFamiliaMiembro.belongsTo(IngresoFamilia, { foreignKey: 'ingreso_id' });
IngresoFamilia.hasMany(IngresoFamiliaMiembro, { foreignKey: 'ingreso_id' });

/* IngresoMiembro0a18 -> IngresoFamiliaMiembro */
IngresoMiembro0a18.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro0a18, { foreignKey: 'miembro_ingreso_id' });

/* IngresoMiembro19a44 -> IngresoFamiliaMiembro */
IngresoMiembro19a44.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro19a44, { foreignKey: 'miembro_ingreso_id' });

/* IngresoMiembro45Mas -> IngresoFamiliaMiembro */
IngresoMiembro45Mas.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro45Mas, { foreignKey: 'miembro_ingreso_id' });

/* IngresoMiembroGestante -> IngresoFamiliaMiembro */
IngresoMiembroGestante.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembroGestante, { foreignKey: 'miembro_ingreso_id' });

export {
  sequelize,
  Familia,
  PeriodoAcademico,
  IngresoFamilia,
  IngresoVivienda,
  IngresoViviendaAnimal,
  IngresoFamiliaMiembro,
  IngresoMiembro0a18,
  IngresoMiembro19a44,
  IngresoMiembro45Mas,
  IngresoMiembroGestante,
};
