import { IngresoMiembro19a44 } from '../../models/index.js';

export async function create(data) {
  return IngresoMiembro19a44.create(data);
}

export async function findById(id) {
  return IngresoMiembro19a44.findByPk(id);
}

export async function findByMiembroIngresoId(miembroIngresoId) {
  return IngresoMiembro19a44.findOne({ where: { miembro_ingreso_id: miembroIngresoId } });
}

export async function update(id, data) {
  const row = await IngresoMiembro19a44.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoMiembro19a44.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
