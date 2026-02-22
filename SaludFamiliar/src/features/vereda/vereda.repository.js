import { Vereda, Territorio } from '../../models/index.js';

export async function create(data) {
  return Vereda.create(data);
}

export async function findById(id) {
  return Vereda.findByPk(id, {
    include: [{ model: Territorio, attributes: ['id', 'nombre'] }],
  });
}

export async function findAll({ territorio_id, activa, page, limit }) {
  const where = {};
  if (territorio_id != null) where.territorio_id = territorio_id;
  if (activa != null) where.activa = activa === 'true';
  const offset = (page - 1) * limit;
  const { count, rows } = await Vereda.findAndCountAll({
    where,
    include: [{ model: Territorio, attributes: ['id', 'nombre'] }],
    order: [['nombre', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Vereda.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Vereda.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
