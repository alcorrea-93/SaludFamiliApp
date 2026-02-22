import { Territorio, Vereda } from '../../models/index.js';

export async function create(data) {
  return Territorio.create(data);
}

export async function findById(id) {
  return Territorio.findByPk(id, {
    include: [{ model: Vereda, attributes: ['id', 'nombre', 'activa'] }],
  });
}

export async function findAll({ activo, page, limit }) {
  const where = {};
  if (activo != null) where.activo = activo === 'true';
  const offset = (page - 1) * limit;
  const { count, rows } = await Territorio.findAndCountAll({
    where,
    order: [['nombre', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Territorio.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Territorio.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
