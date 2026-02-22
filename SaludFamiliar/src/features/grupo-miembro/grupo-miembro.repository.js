import { GrupoMiembro, Estudiante, GrupoEstudiantil, PeriodoAcademico } from '../../models/index.js';

const INCLUDES = [
  { model: Estudiante, attributes: ['id', 'nombres', 'apellidos', 'documento_numero'] },
  { model: GrupoEstudiantil, attributes: ['id', 'nombre', 'codigo'] },
  { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
];

export async function create(data) {
  return GrupoMiembro.create(data);
}

export async function findById(id) {
  return GrupoMiembro.findByPk(id, { include: INCLUDES });
}

export async function findAll({ periodo_id, grupo_id, estudiante_id, page, limit }) {
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (grupo_id != null) where.grupo_id = grupo_id;
  if (estudiante_id != null) where.estudiante_id = estudiante_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await GrupoMiembro.findAndCountAll({
    where,
    include: INCLUDES,
    order: [['creado_en', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function findByGrupoPeriodo(grupoId, periodoId) {
  return GrupoMiembro.findAll({
    where: { grupo_id: grupoId, periodo_id: periodoId },
    include: [{ model: Estudiante, attributes: ['id', 'nombres', 'apellidos', 'documento_numero', 'correo'] }],
    order: [[Estudiante, 'apellidos', 'ASC']],
  });
}

export async function update(id, data) {
  const row = await GrupoMiembro.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await GrupoMiembro.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
