import { Usuario, Rol, Profesor } from '../../models/index.js';
import bcrypt from 'bcryptjs';

const INCLUDES = [
  { model: Rol, attributes: ['id', 'codigo', 'nombre'] },
  { model: Profesor, attributes: ['id', 'nombres', 'apellidos'], required: false },
];

export async function create(data) {
  const salt = await bcrypt.genSalt(10);
  data.password_hash = await bcrypt.hash(data.password, salt);
  delete data.password;
  return Usuario.create(data);
}

export async function findById(id) {
  return Usuario.findByPk(id, { include: INCLUDES });
}

export async function findAll({ activo, rol_id, page, limit }) {
  const where = {};
  if (activo != null) where.activo = activo === 'true';
  if (rol_id != null) where.rol_id = rol_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await Usuario.findAndCountAll({
    where,
    include: INCLUDES,
    order: [['nombre_completo', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Usuario.findByPk(id);
  if (!row) return null;
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password_hash = await bcrypt.hash(data.password, salt);
    delete data.password;
  }
  await row.update(data);
  return Usuario.findByPk(id, { include: INCLUDES });
}

export async function resetPassword(id, newPassword) {
  const row = await Usuario.findByPk(id);
  if (!row) return null;
  const salt = await bcrypt.genSalt(10);
  row.password_hash = await bcrypt.hash(newPassword, salt);
  await row.save();
  return true;
}

export async function remove(id) {
  const row = await Usuario.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
