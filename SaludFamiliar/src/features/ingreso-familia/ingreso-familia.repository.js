import { IngresoFamilia } from '../../models/index.js';

export async function create(data) {
  return IngresoFamilia.create(data);
}

export async function findById(id) {
  return IngresoFamilia.findByPk(id);
}

export async function findAll(filters = {}) {
  const { periodo_id, familia_id } = filters;
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (familia_id != null) where.familia_id = familia_id;
  return IngresoFamilia.findAll({ where, order: [['creado_en', 'DESC']] });
}

export async function update(id, data) {
  const row = await IngresoFamilia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoFamilia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
