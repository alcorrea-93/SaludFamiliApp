import { ProfesorAsignado, Profesor, GrupoEstudiantil, PeriodoAcademico } from '../../models/index.js';

const INCLUDES = [
  { model: Profesor, attributes: ['id', 'nombres', 'apellidos'] },
  { model: GrupoEstudiantil, attributes: ['id', 'nombre', 'codigo'] },
  { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
];

export async function create(data) {
  return ProfesorAsignado.create(data);
}

export async function findById(id) {
  return ProfesorAsignado.findByPk(id, { include: INCLUDES });
}

export async function findAll({ periodo_id, grupo_id, profesor_id, page, limit }) {
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (grupo_id != null) where.grupo_id = grupo_id;
  if (profesor_id != null) where.profesor_id = profesor_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await ProfesorAsignado.findAndCountAll({
    where,
    include: INCLUDES,
    order: [['creado_en', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await ProfesorAsignado.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await ProfesorAsignado.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
