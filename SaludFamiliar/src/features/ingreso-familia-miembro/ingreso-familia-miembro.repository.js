import {
  IngresoFamiliaMiembro,
  IngresoMiembro0a18,
  IngresoMiembro19a44,
  IngresoMiembro45Mas,
  IngresoMiembroGestante,
} from '../../models/index.js';

export async function create(data) {
  return IngresoFamiliaMiembro.create(data);
}

export async function findById(id) {
  return IngresoFamiliaMiembro.findByPk(id, {
    include: [
      { model: IngresoMiembro0a18, required: false },
      { model: IngresoMiembro19a44, required: false },
      { model: IngresoMiembro45Mas, required: false },
      { model: IngresoMiembroGestante, required: false },
    ],
  });
}

export async function findAll({ ingreso_id, page, limit }) {
  const where = {};
  if (ingreso_id != null) where.ingreso_id = ingreso_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await IngresoFamiliaMiembro.findAndCountAll({
    where,
    order: [['num_en_familia', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
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
