import { IngresoMiembroGestante } from '../../models/index.js';

export async function create(data) {
  return IngresoMiembroGestante.create(data);
}

export async function findById(id) {
  return IngresoMiembroGestante.findByPk(id);
}

export async function findByMiembroIngresoId(miembroIngresoId) {
  return IngresoMiembroGestante.findOne({ where: { miembro_ingreso_id: miembroIngresoId } });
}

export async function update(id, data) {
  const row = await IngresoMiembroGestante.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoMiembroGestante.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
