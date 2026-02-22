import { IngresoVivienda, IngresoViviendaAnimal } from '../../models/index.js';

export async function create(data) {
  return IngresoVivienda.create(data);
}

export async function findById(id) {
  return IngresoVivienda.findByPk(id, {
    include: [{ model: IngresoViviendaAnimal }],
  });
}

export async function findByIngresoId(ingresoId) {
  return IngresoVivienda.findOne({
    where: { ingreso_id: ingresoId },
    include: [{ model: IngresoViviendaAnimal }],
  });
}

export async function findAll({ ingreso_id, page, limit }) {
  const where = {};
  if (ingreso_id != null) where.ingreso_id = ingreso_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await IngresoVivienda.findAndCountAll({
    where,
    order: [['creado_en', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
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
