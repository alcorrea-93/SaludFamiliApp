import './models/index.js';
import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/database.js';
import { Rol, Usuario } from './models/index.js';

async function seed() {
  await connectDatabase();

  const roles = [
    { codigo: 'ADMIN', nombre: 'Administrador', descripcion: 'Acceso total' },
    { codigo: 'JEFE_MATERIA', nombre: 'Jefe de materia', descripcion: 'Consultas e informes' },
    { codigo: 'DOCENTE', nombre: 'Docente', descripcion: 'Ingresos, seguimientos, consulta' },
  ];

  for (const r of roles) {
    await Rol.findOrCreate({ where: { codigo: r.codigo }, defaults: r });
  }
  console.log('Roles creados/verificados.');

  const adminRol = await Rol.findOne({ where: { codigo: 'ADMIN' } });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin123', salt);

  const [admin, created] = await Usuario.findOrCreate({
    where: { correo: 'admin@saludfamiliar.edu.co' },
    defaults: {
      nombre_completo: 'Administrador',
      correo: 'admin@saludfamiliar.edu.co',
      password_hash: hash,
      rol_id: adminRol.id,
      activo: true,
    },
  });

  if (created) {
    console.log('Usuario admin creado: admin@saludfamiliar.edu.co / admin123');
  } else {
    console.log('Usuario admin ya existe.');
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
