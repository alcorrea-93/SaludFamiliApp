import { IngresoVivienda } from '../../models/index.js';

export async function create(data) {
  return IngresoVivienda.create(data);
}

export async function findById(id) {
  return IngresoVivienda.findByPk(id);
}

export async function findByIngresoId(ingresoId) {
  return IngresoVivienda.findOne({ where: { ingreso_id: ingresoId } });
}

export async function findAll(filters = {}) {
  const { ingreso_id } = filters;
  const where = {};
  if (ingreso_id != null) where.ingreso_id = ingreso_id;
  return IngresoVivienda.findAll({ where, order: [['creado_en', 'DESC']] });
}

export async function update(id, data) {
  const row = await IngresoVivienda.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoVivienda.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
