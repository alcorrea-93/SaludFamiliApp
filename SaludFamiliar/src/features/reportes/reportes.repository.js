import { sequelize } from '../../models/index.js';
import { QueryTypes } from 'sequelize';

// --- INGRESOS ---

export async function resumenIngresos({ anio, semestre, territorio_id, vereda_id }) {
  const conditions = [];
  const replacements = {};
  if (anio) { conditions.push('pa.anio = :anio'); replacements.anio = anio; }
  if (semestre) { conditions.push('pa.semestre = :semestre'); replacements.semestre = semestre; }
  if (territorio_id) { conditions.push('t.id = :territorio_id'); replacements.territorio_id = territorio_id; }
  if (vereda_id) { conditions.push('v.id = :vereda_id'); replacements.vereda_id = vereda_id; }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  return sequelize.query(`
    SELECT
      pa.codigo AS periodo,
      t.nombre AS territorio,
      v.nombre AS vereda,
      COUNT(DISTINCT inf.id) AS total_ingresos,
      COUNT(DISTINCT ifm.id) AS total_miembros,
      COUNT(DISTINCT img.id) AS total_gestantes
    FROM ingreso_familia inf
    JOIN familia f ON f.id = inf.familia_id
    JOIN vereda v ON v.id = f.vereda_id
    JOIN territorio t ON t.id = v.territorio_id
    JOIN periodo_academico pa ON pa.id = inf.periodo_id
    LEFT JOIN ingreso_familia_miembro ifm ON ifm.ingreso_id = inf.id
    LEFT JOIN ingreso_miembro_gestante img ON img.miembro_ingreso_id = ifm.id
    ${where}
    GROUP BY pa.codigo, t.nombre, v.nombre
    ORDER BY pa.codigo, t.nombre
  `, { replacements, type: QueryTypes.SELECT });
}

export async function conteoIngresosPorPeriodo() {
  return sequelize.query(`
    SELECT pa.codigo AS periodo, pa.anio, pa.semestre,
           COUNT(inf.id) AS total_ingresos
    FROM periodo_academico pa
    LEFT JOIN ingreso_familia inf ON inf.periodo_id = pa.id
    GROUP BY pa.id, pa.codigo, pa.anio, pa.semestre
    ORDER BY pa.anio DESC, pa.semestre DESC
  `, { type: QueryTypes.SELECT });
}

export async function conteoIngresosPorTerritorio({ anio, semestre }) {
  const conditions = [];
  const replacements = {};
  if (anio) { conditions.push('pa.anio = :anio'); replacements.anio = anio; }
  if (semestre) { conditions.push('pa.semestre = :semestre'); replacements.semestre = semestre; }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  return sequelize.query(`
    SELECT t.id AS territorio_id, t.nombre AS territorio, t.municipio,
           COUNT(DISTINCT inf.id) AS total_ingresos,
           COUNT(DISTINCT f.id) AS total_familias
    FROM territorio t
    JOIN vereda v ON v.territorio_id = t.id
    JOIN familia f ON f.vereda_id = v.id
    LEFT JOIN ingreso_familia inf ON inf.familia_id = f.id
    LEFT JOIN periodo_academico pa ON pa.id = inf.periodo_id
    ${where}
    GROUP BY t.id, t.nombre, t.municipio
    ORDER BY total_ingresos DESC
  `, { replacements, type: QueryTypes.SELECT });
}

// --- SEGUIMIENTOS ---

export async function resumenSeguimientos({ anio, semestre, territorio_id, grupo_id, profesor_id }) {
  const conditions = [];
  const replacements = {};
  if (anio) { conditions.push('pa.anio = :anio'); replacements.anio = anio; }
  if (semestre) { conditions.push('pa.semestre = :semestre'); replacements.semestre = semestre; }
  if (territorio_id) { conditions.push('t.id = :territorio_id'); replacements.territorio_id = territorio_id; }
  if (grupo_id) { conditions.push('s.grupo_id = :grupo_id'); replacements.grupo_id = grupo_id; }
  if (profesor_id) { conditions.push('s.profesor_id = :profesor_id'); replacements.profesor_id = profesor_id; }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  return sequelize.query(`
    SELECT
      pa.codigo AS periodo,
      t.nombre AS territorio,
      COUNT(DISTINCT s.id) AS total_seguimientos,
      COUNT(DISTINCT s.familia_id) AS familias_con_seguimiento,
      COUNT(DISTINCT sp.estudiante_id) AS estudiantes_participantes
    FROM seguimiento s
    JOIN familia f ON f.id = s.familia_id
    JOIN vereda v ON v.id = f.vereda_id
    JOIN territorio t ON t.id = v.territorio_id
    JOIN periodo_academico pa ON pa.id = s.periodo_id
    LEFT JOIN seguimiento_participante sp ON sp.seguimiento_id = s.id
    ${where}
    GROUP BY pa.codigo, t.nombre
    ORDER BY pa.codigo, t.nombre
  `, { replacements, type: QueryTypes.SELECT });
}

export async function familiasSinSeguimiento({ periodo_id }) {
  const replacements = {};
  let periodoCond = '';
  if (periodo_id) {
    periodoCond = 'AND inf.periodo_id = :periodo_id';
    replacements.periodo_id = periodo_id;
  }

  return sequelize.query(`
    SELECT f.id, f.codigo_familia, f.nombre_familia, v.nombre AS vereda, t.nombre AS territorio
    FROM familia f
    JOIN vereda v ON v.id = f.vereda_id
    JOIN territorio t ON t.id = v.territorio_id
    JOIN ingreso_familia inf ON inf.familia_id = f.id ${periodoCond}
    LEFT JOIN seguimiento s ON s.familia_id = f.id AND s.periodo_id = inf.periodo_id
    WHERE s.id IS NULL
    ORDER BY t.nombre, f.nombre_familia
  `, { replacements, type: QueryTypes.SELECT });
}

// --- ACADEMICO ---

export async function resumenAcademico({ periodo_id }) {
  const conditions = [];
  const replacements = {};
  if (periodo_id) { conditions.push('gm.periodo_id = :periodo_id'); replacements.periodo_id = periodo_id; }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  return sequelize.query(`
    SELECT
      ge.id AS grupo_id, ge.nombre AS grupo, ge.codigo AS grupo_codigo,
      pa.codigo AS periodo,
      COUNT(DISTINCT gm.estudiante_id) AS total_estudiantes,
      COUNT(DISTINCT afg.familia_id) AS total_familias_asignadas,
      COUNT(DISTINCT s.id) AS total_seguimientos
    FROM grupo_estudiantil ge
    JOIN grupo_miembro gm ON gm.grupo_id = ge.id
    JOIN periodo_academico pa ON pa.id = gm.periodo_id
    LEFT JOIN asignacion_familia_grupo afg ON afg.grupo_id = ge.id AND afg.periodo_id = gm.periodo_id
    LEFT JOIN seguimiento s ON s.grupo_id = ge.id AND s.periodo_id = gm.periodo_id
    ${where}
    GROUP BY ge.id, ge.nombre, ge.codigo, pa.codigo
    ORDER BY pa.codigo, ge.nombre
  `, { replacements, type: QueryTypes.SELECT });
}
