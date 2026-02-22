import { Profesor } from '../../models/index.js';
import { Op } from 'sequelize';

export async function create(data) {
  return Profesor.create(data);
}

export async function findById(id) {
  return Profesor.findByPk(id);
}

export async function findAll({ activo, q, page, limit }) {
  const where = {};
  if (activo != null) where.activo = activo === 'true';
  if (q) {
    where[Op.or] = [
      { nombres: { [Op.iLike]: `%${q}%` } },
      { apellidos: { [Op.iLike]: `%${q}%` } },
      { documento_numero: { [Op.iLike]: `%${q}%` } },
    ];
  }
  const offset = (page - 1) * limit;
  const { count, rows } = await Profesor.findAndCountAll({
    where,
    order: [['apellidos', 'ASC'], ['nombres', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Profesor.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Profesor.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
