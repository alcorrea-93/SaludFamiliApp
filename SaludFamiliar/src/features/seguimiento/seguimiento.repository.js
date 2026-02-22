import {
  Seguimiento,
  Familia,
  GrupoEstudiantil,
  Profesor,
  PeriodoAcademico,
  SeguimientoParticipante,
  Estudiante,
} from '../../models/index.js';

const INCLUDES_LITE = [
  { model: Familia, attributes: ['id', 'nombre_familia'] },
  { model: GrupoEstudiantil, attributes: ['id', 'nombre', 'codigo'] },
  { model: Profesor, attributes: ['id', 'nombres', 'apellidos'] },
  { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
];

export async function create(data) {
  return Seguimiento.create(data);
}

export async function findById(id) {
  return Seguimiento.findByPk(id, { include: INCLUDES_LITE });
}

export async function findCompleto(id) {
  return Seguimiento.findByPk(id, {
    include: [
      ...INCLUDES_LITE,
      {
        model: SeguimientoParticipante,
        include: [{ model: Estudiante, attributes: ['id', 'nombres', 'apellidos', 'documento_numero'] }],
      },
    ],
  });
}

export async function findAll({ periodo_id, familia_id, grupo_id, profesor_id, page, limit }) {
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (familia_id != null) where.familia_id = familia_id;
  if (grupo_id != null) where.grupo_id = grupo_id;
  if (profesor_id != null) where.profesor_id = profesor_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await Seguimiento.findAndCountAll({
    where,
    include: INCLUDES_LITE,
    order: [['fecha_seguimiento', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Seguimiento.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Seguimiento.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
