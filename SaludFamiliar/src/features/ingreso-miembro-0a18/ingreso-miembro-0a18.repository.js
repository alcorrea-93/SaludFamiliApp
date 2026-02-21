import { IngresoMiembro0a18 } from '../../models/index.js';

export async function create(data) {
  return IngresoMiembro0a18.create(data);
}

export async function findById(id) {
  return IngresoMiembro0a18.findByPk(id);
}

export async function findByMiembroIngresoId(miembroIngresoId) {
  return IngresoMiembro0a18.findOne({ where: { miembro_ingreso_id: miembroIngresoId } });
}

export async function update(id, data) {
  const row = await IngresoMiembro0a18.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoMiembro0a18.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
