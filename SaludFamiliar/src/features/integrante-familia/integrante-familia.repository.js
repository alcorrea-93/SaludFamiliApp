import { IntegranteFamilia, Familia } from '../../models/index.js';

export async function create(data) {
  return IntegranteFamilia.create(data);
}

export async function findById(id) {
  return IntegranteFamilia.findByPk(id, {
    include: [{ model: Familia, attributes: ['id', 'nombre_familia'] }],
  });
}

export async function findAll({ familia_id, activo, page, limit }) {
  const where = {};
  if (familia_id != null) where.familia_id = familia_id;
  if (activo != null) where.activo = activo === 'true';
  const offset = (page - 1) * limit;
  const { count, rows } = await IntegranteFamilia.findAndCountAll({
    where,
    include: [{ model: Familia, attributes: ['id', 'nombre_familia'] }],
    order: [['apellidos', 'ASC'], ['nombres', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function findByFamiliaId(familiaId) {
  return IntegranteFamilia.findAll({
    where: { familia_id: familiaId, activo: true },
    order: [['es_jefe', 'DESC'], ['apellidos', 'ASC'], ['nombres', 'ASC']],
  });
}

export async function update(id, data) {
  const row = await IntegranteFamilia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IntegranteFamilia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
