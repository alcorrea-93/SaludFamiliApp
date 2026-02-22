import { AsignacionFamiliaGrupo, Familia, GrupoEstudiantil, PeriodoAcademico } from '../../models/index.js';

const INCLUDES = [
  { model: Familia, attributes: ['id', 'nombre_familia'] },
  { model: GrupoEstudiantil, attributes: ['id', 'nombre', 'codigo'] },
  { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
];

export async function create(data) {
  return AsignacionFamiliaGrupo.create(data);
}

export async function findById(id) {
  return AsignacionFamiliaGrupo.findByPk(id, { include: INCLUDES });
}

export async function findAll({ periodo_id, grupo_id, familia_id, page, limit }) {
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (grupo_id != null) where.grupo_id = grupo_id;
  if (familia_id != null) where.familia_id = familia_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await AsignacionFamiliaGrupo.findAndCountAll({
    where,
    include: INCLUDES,
    order: [['creado_en', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function findByGrupoPeriodo(grupoId, periodoId) {
  return AsignacionFamiliaGrupo.findAll({
    where: { grupo_id: grupoId, periodo_id: periodoId },
    include: [{ model: Familia, attributes: ['id', 'nombre_familia', 'telefono_contacto'] }],
    order: [[Familia, 'nombre_familia', 'ASC']],
  });
}

export async function update(id, data) {
  const row = await AsignacionFamiliaGrupo.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await AsignacionFamiliaGrupo.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
