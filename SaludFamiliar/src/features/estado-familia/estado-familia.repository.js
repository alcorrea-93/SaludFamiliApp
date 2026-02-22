import { EstadoFamilia } from '../../models/index.js';

export async function create(data) {
  return EstadoFamilia.create(data);
}

export async function findById(id) {
  return EstadoFamilia.findByPk(id);
}

export async function findAll() {
  return EstadoFamilia.findAll({ order: [['nombre', 'ASC']] });
}

export async function update(id, data) {
  const row = await EstadoFamilia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await EstadoFamilia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
