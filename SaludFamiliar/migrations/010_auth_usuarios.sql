-- Roles del sistema
CREATE TABLE IF NOT EXISTS rol (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  descripcion TEXT
);

INSERT INTO rol (codigo, nombre, descripcion) VALUES
  ('ADMIN', 'Administrador', 'Acceso total: gestión de usuarios, privilegios y recuperación de contraseñas'),
  ('JEFE_MATERIA', 'Jefe de materia', 'Consultas e informes sobre ingresos, seguimientos y académico'),
  ('DOCENTE', 'Docente', 'Ingresos de familias, seguimientos, consulta de estudiantes y familias asignadas')
ON CONFLICT (codigo) DO NOTHING;

-- Usuarios del sistema
CREATE TABLE IF NOT EXISTS usuario (
  id BIGSERIAL PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol_id BIGINT NOT NULL REFERENCES rol(id),
  profesor_id BIGINT REFERENCES profesor(id),
  activo BOOLEAN NOT NULL DEFAULT true,
  ultimo_login TIMESTAMPTZ,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usuario_correo ON usuario(correo);
CREATE INDEX IF NOT EXISTS idx_usuario_rol ON usuario(rol_id);

-- Usuario admin inicial (password: admin123 - cambiar en producción)
-- El hash se genera con bcryptjs, rounds=10
-- Para admin123: $2a$10$... (se insertará desde el seed del backend)
