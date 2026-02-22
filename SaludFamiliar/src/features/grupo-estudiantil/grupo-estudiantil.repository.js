import { GrupoEstudiantil } from '../../models/index.js';

export async function create(data) {
  return GrupoEstudiantil.create(data);
}

export async function findById(id) {
  return GrupoEstudiantil.findByPk(id);
}

export async function findAll({ page, limit }) {
  const offset = (page - 1) * limit;
  const { count, rows } = await GrupoEstudiantil.findAndCountAll({
    order: [['nombre', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await GrupoEstudiantil.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await GrupoEstudiantil.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
