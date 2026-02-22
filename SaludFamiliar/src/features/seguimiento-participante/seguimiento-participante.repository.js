import { SeguimientoParticipante, Estudiante, Seguimiento } from '../../models/index.js';

export async function create(data) {
  return SeguimientoParticipante.create(data);
}

export async function findById(id) {
  return SeguimientoParticipante.findByPk(id, {
    include: [{ model: Estudiante, attributes: ['id', 'nombres', 'apellidos', 'documento_numero'] }],
  });
}

export async function findBySeguimientoId(seguimientoId) {
  return SeguimientoParticipante.findAll({
    where: { seguimiento_id: seguimientoId },
    include: [{ model: Estudiante, attributes: ['id', 'nombres', 'apellidos', 'documento_numero', 'correo'] }],
    order: [[Estudiante, 'apellidos', 'ASC']],
  });
}

export async function update(id, data) {
  const row = await SeguimientoParticipante.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await SeguimientoParticipante.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
