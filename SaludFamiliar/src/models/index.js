import { sequelize } from '../config/database.js';

/* --- Catálogos territoriales --- */
import { Territorio } from './Territorio.js';
import { Vereda } from './Vereda.js';

/* --- Familias --- */
import { Familia } from './Familia.js';
import { IntegranteFamilia } from './IntegranteFamilia.js';
import { EstadoFamilia } from './EstadoFamilia.js';
import { HistorialEstadoFamilia } from './HistorialEstadoFamilia.js';

/* --- Periodos --- */
import { PeriodoAcademico } from './PeriodoAcademico.js';

/* --- Académicos --- */
import { Profesor } from './Profesor.js';
import { Estudiante } from './Estudiante.js';
import { Asignatura } from './Asignatura.js';
import { GrupoEstudiantil } from './GrupoEstudiantil.js';
import { ProfesorAsignado } from './ProfesorAsignado.js';
import { GrupoMiembro } from './GrupoMiembro.js';
import { AsignacionFamiliaGrupo } from './AsignacionFamiliaGrupo.js';

/* --- Ingreso --- */
import { IngresoFamilia } from './IngresoFamilia.js';
import { IngresoVivienda } from './IngresoVivienda.js';
import { IngresoViviendaAnimal } from './IngresoViviendaAnimal.js';
import { IngresoFamiliaMiembro } from './IngresoFamiliaMiembro.js';
import { IngresoMiembro0a18 } from './IngresoMiembro0a18.js';
import { IngresoMiembro19a44 } from './IngresoMiembro19a44.js';
import { IngresoMiembro45Mas } from './IngresoMiembro45Mas.js';
import { IngresoMiembroGestante } from './IngresoMiembroGestante.js';

/* --- Seguimiento --- */
import { Seguimiento } from './Seguimiento.js';
import { SeguimientoParticipante } from './SeguimientoParticipante.js';
import { FamiliaPerdidaRegistro } from './FamiliaPerdidaRegistro.js';

/* ========== ASOCIACIONES ========== */

/* Territorio -> Vereda -> Familia */
Vereda.belongsTo(Territorio, { foreignKey: 'territorio_id' });
Territorio.hasMany(Vereda, { foreignKey: 'territorio_id' });

Familia.belongsTo(Vereda, { foreignKey: 'vereda_id' });
Vereda.hasMany(Familia, { foreignKey: 'vereda_id' });

/* IntegranteFamilia <-> Familia */
IntegranteFamilia.belongsTo(Familia, { foreignKey: 'familia_id' });
Familia.hasMany(IntegranteFamilia, { foreignKey: 'familia_id' });
Familia.belongsTo(IntegranteFamilia, { as: 'JefeIntegrante', foreignKey: 'jefe_integrante_id' });

/* EstadoFamilia / HistorialEstadoFamilia */
HistorialEstadoFamilia.belongsTo(Familia, { foreignKey: 'familia_id' });
Familia.hasMany(HistorialEstadoFamilia, { foreignKey: 'familia_id' });
HistorialEstadoFamilia.belongsTo(EstadoFamilia, { foreignKey: 'estado_id' });
EstadoFamilia.hasMany(HistorialEstadoFamilia, { foreignKey: 'estado_id' });

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

/* Miembros por edad -> IngresoFamiliaMiembro */
IngresoMiembro0a18.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro0a18, { foreignKey: 'miembro_ingreso_id' });

IngresoMiembro19a44.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro19a44, { foreignKey: 'miembro_ingreso_id' });

IngresoMiembro45Mas.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembro45Mas, { foreignKey: 'miembro_ingreso_id' });

IngresoMiembroGestante.belongsTo(IngresoFamiliaMiembro, { foreignKey: 'miembro_ingreso_id' });
IngresoFamiliaMiembro.hasOne(IngresoMiembroGestante, { foreignKey: 'miembro_ingreso_id' });

/* Profesor asignado a grupo por periodo */
ProfesorAsignado.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
ProfesorAsignado.belongsTo(GrupoEstudiantil, { foreignKey: 'grupo_id' });
ProfesorAsignado.belongsTo(Profesor, { foreignKey: 'profesor_id' });
PeriodoAcademico.hasMany(ProfesorAsignado, { foreignKey: 'periodo_id' });
GrupoEstudiantil.hasMany(ProfesorAsignado, { foreignKey: 'grupo_id' });
Profesor.hasMany(ProfesorAsignado, { foreignKey: 'profesor_id' });

/* Grupo miembro (estudiante en grupo por periodo) */
GrupoMiembro.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
GrupoMiembro.belongsTo(GrupoEstudiantil, { foreignKey: 'grupo_id' });
GrupoMiembro.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });
PeriodoAcademico.hasMany(GrupoMiembro, { foreignKey: 'periodo_id' });
GrupoEstudiantil.hasMany(GrupoMiembro, { foreignKey: 'grupo_id' });
Estudiante.hasMany(GrupoMiembro, { foreignKey: 'estudiante_id' });

/* Asignación familia-grupo por periodo */
AsignacionFamiliaGrupo.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
AsignacionFamiliaGrupo.belongsTo(GrupoEstudiantil, { foreignKey: 'grupo_id' });
AsignacionFamiliaGrupo.belongsTo(Familia, { foreignKey: 'familia_id' });
PeriodoAcademico.hasMany(AsignacionFamiliaGrupo, { foreignKey: 'periodo_id' });
GrupoEstudiantil.hasMany(AsignacionFamiliaGrupo, { foreignKey: 'grupo_id' });
Familia.hasMany(AsignacionFamiliaGrupo, { foreignKey: 'familia_id' });

/* Seguimiento */
Seguimiento.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
Seguimiento.belongsTo(Familia, { foreignKey: 'familia_id' });
Seguimiento.belongsTo(GrupoEstudiantil, { foreignKey: 'grupo_id' });
Seguimiento.belongsTo(Profesor, { foreignKey: 'profesor_id' });
PeriodoAcademico.hasMany(Seguimiento, { foreignKey: 'periodo_id' });
Familia.hasMany(Seguimiento, { foreignKey: 'familia_id' });
GrupoEstudiantil.hasMany(Seguimiento, { foreignKey: 'grupo_id' });
Profesor.hasMany(Seguimiento, { foreignKey: 'profesor_id' });

/* SeguimientoParticipante */
SeguimientoParticipante.belongsTo(Seguimiento, { foreignKey: 'seguimiento_id' });
Seguimiento.hasMany(SeguimientoParticipante, { foreignKey: 'seguimiento_id' });
SeguimientoParticipante.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });
Estudiante.hasMany(SeguimientoParticipante, { foreignKey: 'estudiante_id' });

/* FamiliaPerdidaRegistro */
FamiliaPerdidaRegistro.belongsTo(HistorialEstadoFamilia, { foreignKey: 'historial_estado_id' });
HistorialEstadoFamilia.hasOne(FamiliaPerdidaRegistro, { foreignKey: 'historial_estado_id' });
FamiliaPerdidaRegistro.belongsTo(Familia, { foreignKey: 'familia_id' });
Familia.hasMany(FamiliaPerdidaRegistro, { foreignKey: 'familia_id' });
FamiliaPerdidaRegistro.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
FamiliaPerdidaRegistro.belongsTo(GrupoEstudiantil, { foreignKey: 'grupo_estudiantil_id' });

export {
  sequelize,
  Territorio,
  Vereda,
  Familia,
  IntegranteFamilia,
  EstadoFamilia,
  HistorialEstadoFamilia,
  PeriodoAcademico,
  Profesor,
  Estudiante,
  Asignatura,
  GrupoEstudiantil,
  ProfesorAsignado,
  GrupoMiembro,
  AsignacionFamiliaGrupo,
  IngresoFamilia,
  IngresoVivienda,
  IngresoViviendaAnimal,
  IngresoFamiliaMiembro,
  IngresoMiembro0a18,
  IngresoMiembro19a44,
  IngresoMiembro45Mas,
  IngresoMiembroGestante,
  Seguimiento,
  SeguimientoParticipante,
  FamiliaPerdidaRegistro,
};
