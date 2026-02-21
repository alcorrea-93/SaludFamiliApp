import { IngresoMiembro45Mas } from '../../models/index.js';

export async function create(data) {
  return IngresoMiembro45Mas.create(data);
}

export async function findById(id) {
  return IngresoMiembro45Mas.findByPk(id);
}

export async function findByMiembroIngresoId(miembroIngresoId) {
  return IngresoMiembro45Mas.findOne({ where: { miembro_ingreso_id: miembroIngresoId } });
}

export async function update(id, data) {
  const row = await IngresoMiembro45Mas.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoMiembro45Mas.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
