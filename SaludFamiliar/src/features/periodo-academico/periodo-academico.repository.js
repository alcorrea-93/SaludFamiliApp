import { PeriodoAcademico } from '../../models/index.js';

export async function create(data) {
  return PeriodoAcademico.create(data);
}

export async function findById(id) {
  return PeriodoAcademico.findByPk(id);
}

export async function findAll({ activo, page, limit }) {
  const where = {};
  if (activo != null) where.activo = activo === 'true';
  const offset = (page - 1) * limit;
  const { count, rows } = await PeriodoAcademico.findAndCountAll({
    where,
    order: [['anio', 'DESC'], ['semestre', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function findActivo() {
  return PeriodoAcademico.findOne({ where: { activo: true }, order: [['anio', 'DESC'], ['semestre', 'DESC']] });
}

export async function update(id, data) {
  const row = await PeriodoAcademico.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await PeriodoAcademico.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
