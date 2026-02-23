import { Usuario, Rol } from '../../models/index.js';

export async function findByCorreo(correo) {
  return Usuario.scope('withPassword').findOne({
    where: { correo },
    include: [{ model: Rol, attributes: ['id', 'codigo', 'nombre'] }],
  });
}

export async function updateLastLogin(id) {
  return Usuario.update({ ultimo_login: new Date() }, { where: { id } });
}
