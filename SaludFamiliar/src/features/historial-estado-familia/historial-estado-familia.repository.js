import { HistorialEstadoFamilia, EstadoFamilia, Familia } from '../../models/index.js';

export async function create(data) {
  return HistorialEstadoFamilia.create(data);
}

export async function findById(id) {
  return HistorialEstadoFamilia.findByPk(id, {
    include: [
      { model: EstadoFamilia, attributes: ['id', 'codigo', 'nombre'] },
      { model: Familia, attributes: ['id', 'nombre_familia'] },
    ],
  });
}

export async function findByFamiliaId(familiaId) {
  return HistorialEstadoFamilia.findAll({
    where: { familia_id: familiaId },
    include: [{ model: EstadoFamilia, attributes: ['id', 'codigo', 'nombre'] }],
    order: [['fecha_desde', 'DESC']],
  });
}

export async function update(id, data) {
  const row = await HistorialEstadoFamilia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await HistorialEstadoFamilia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
