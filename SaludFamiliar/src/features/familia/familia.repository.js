import { Familia, Vereda, Territorio } from '../../models/index.js';

export async function create(data) {
  return Familia.create(data);
}

export async function findById(id) {
  return Familia.findByPk(id, {
    include: [{
      model: Vereda,
      attributes: ['id', 'nombre'],
      include: [{ model: Territorio, attributes: ['id', 'nombre'] }],
    }],
  });
}

export async function findAll({ vereda_id, q, page, limit }) {
  const where = {};
  if (vereda_id != null) where.vereda_id = vereda_id;

  const { Op } = await import('sequelize');
  if (q) {
    where.nombre_familia = { [Op.iLike]: `%${q}%` };
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await Familia.findAndCountAll({
    where,
    include: [{
      model: Vereda,
      attributes: ['id', 'nombre'],
      include: [{ model: Territorio, attributes: ['id', 'nombre'] }],
    }],
    order: [['nombre_familia', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Familia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Familia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
