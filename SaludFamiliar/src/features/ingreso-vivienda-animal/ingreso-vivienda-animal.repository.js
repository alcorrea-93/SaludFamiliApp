import { IngresoViviendaAnimal } from '../../models/index.js';

export async function create(data) {
  return IngresoViviendaAnimal.create(data);
}

export async function findById(id) {
  return IngresoViviendaAnimal.findByPk(id);
}

export async function findByViviendaId(ingresoViviendaId) {
  return IngresoViviendaAnimal.findAll({
    where: { ingreso_vivienda_id: ingresoViviendaId },
    order: [['tipo', 'ASC']],
  });
}

export async function update(id, data) {
  const row = await IngresoViviendaAnimal.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoViviendaAnimal.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
