import { IngresoFamiliaMiembro } from '../../models/index.js';

export async function create(data) {
  return IngresoFamiliaMiembro.create(data);
}

export async function findById(id) {
  return IngresoFamiliaMiembro.findByPk(id);
}

export async function findAll(filters = {}) {
  const { ingreso_id } = filters;
  const where = {};
  if (ingreso_id != null) where.ingreso_id = ingreso_id;
  return IngresoFamiliaMiembro.findAll({ where, order: [['num_en_familia', 'ASC']] });
}

export async function update(id, data) {
  const row = await IngresoFamiliaMiembro.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoFamiliaMiembro.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
