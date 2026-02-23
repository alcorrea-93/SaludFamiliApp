import bcrypt from 'bcryptjs';
import * as repo from './auth.repository.js';
import { generateToken } from '../../shared/auth.js';

export async function login(correo, password) {
  const user = await repo.findByCorreo(correo);
  if (!user) return { error: 'Credenciales inválidas' };
  if (!user.activo) return { error: 'Usuario desactivado' };

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return { error: 'Credenciales inválidas' };

  await repo.updateLastLogin(user.id);

  const token = generateToken({
    id: user.id,
    correo: user.correo,
    rol: user.Rol.codigo,
    nombre: user.nombre_completo,
    profesor_id: user.profesor_id,
  });

  return {
    token,
    usuario: {
      id: user.id,
      nombre_completo: user.nombre_completo,
      correo: user.correo,
      rol: user.Rol,
      profesor_id: user.profesor_id,
    },
  };
}
