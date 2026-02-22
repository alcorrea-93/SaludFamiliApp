-- Seguimiento de familia (vinculado a periodo, familia, grupo, profesor)
CREATE TABLE IF NOT EXISTS seguimiento (
  id BIGSERIAL PRIMARY KEY,
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  familia_id BIGINT NOT NULL REFERENCES familia(id),
  grupo_id BIGINT NOT NULL REFERENCES grupo_estudiantil(id),
  profesor_id BIGINT NOT NULL REFERENCES profesor(id),
  fecha_seguimiento DATE NOT NULL,
  observaciones_docente TEXT,
  aspectos_trabajados TEXT,
  temas_a_trabajar TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seguimiento_familia ON seguimiento(familia_id);
CREATE INDEX IF NOT EXISTS idx_seguimiento_grupo ON seguimiento(grupo_id);
CREATE INDEX IF NOT EXISTS idx_seguimiento_periodo ON seguimiento(periodo_id);

-- Participantes (estudiantes) en un seguimiento
CREATE TABLE IF NOT EXISTS seguimiento_participante (
  id BIGSERIAL PRIMARY KEY,
  seguimiento_id BIGINT NOT NULL REFERENCES seguimiento(id) ON DELETE CASCADE,
  estudiante_id BIGINT NOT NULL REFERENCES estudiante(id),
  rol TEXT NOT NULL DEFAULT 'ACTIVO',
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(seguimiento_id, estudiante_id)
);

CREATE INDEX IF NOT EXISTS idx_seg_participante_seg ON seguimiento_participante(seguimiento_id);

-- Snapshot de familias perdidas
CREATE TABLE IF NOT EXISTS familia_perdida_registro (
  id BIGSERIAL PRIMARY KEY,
  historial_estado_id BIGINT NOT NULL UNIQUE REFERENCES historial_estado_familia(id),
  familia_id BIGINT NOT NULL REFERENCES familia(id),
  periodo_id BIGINT REFERENCES periodo_academico(id),
  grupo_estudiantil_id BIGINT REFERENCES grupo_estudiantil(id),
  fecha_registro DATE NOT NULL,
  territorio TEXT NOT NULL,
  nombre_familia TEXT NOT NULL,
  jefe_familia TEXT,
  telefono_jefe TEXT,
  causa TEXT NOT NULL,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fam_perdida_familia ON familia_perdida_registro(familia_id, fecha_registro);
