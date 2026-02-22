import {
  FamiliaPerdidaRegistro,
  Familia,
  PeriodoAcademico,
  GrupoEstudiantil,
  HistorialEstadoFamilia,
} from '../../models/index.js';

const INCLUDES = [
  { model: Familia, attributes: ['id', 'nombre_familia'] },
  { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'], required: false },
  { model: GrupoEstudiantil, attributes: ['id', 'nombre', 'codigo'], required: false },
];

export async function create(data) {
  return FamiliaPerdidaRegistro.create(data);
}

export async function findById(id) {
  return FamiliaPerdidaRegistro.findByPk(id, { include: INCLUDES });
}

export async function findAll({ familia_id, periodo_id, page, limit }) {
  const where = {};
  if (familia_id != null) where.familia_id = familia_id;
  if (periodo_id != null) where.periodo_id = periodo_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await FamiliaPerdidaRegistro.findAndCountAll({
    where,
    include: INCLUDES,
    order: [['fecha_registro', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await FamiliaPerdidaRegistro.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await FamiliaPerdidaRegistro.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
