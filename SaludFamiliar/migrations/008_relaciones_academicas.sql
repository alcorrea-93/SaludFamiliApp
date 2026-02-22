-- Profesor asignado a un grupo en un periodo
CREATE TABLE IF NOT EXISTS profesor_asignado (
  id BIGSERIAL PRIMARY KEY,
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  grupo_id BIGINT NOT NULL REFERENCES grupo_estudiantil(id),
  profesor_id BIGINT NOT NULL REFERENCES profesor(id),
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(periodo_id, grupo_id)
);

-- Estudiante miembro de un grupo en un periodo
CREATE TABLE IF NOT EXISTS grupo_miembro (
  id BIGSERIAL PRIMARY KEY,
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  grupo_id BIGINT NOT NULL REFERENCES grupo_estudiantil(id),
  estudiante_id BIGINT NOT NULL REFERENCES estudiante(id),
  rol TEXT NOT NULL DEFAULT 'INTEGRANTE',
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(periodo_id, grupo_id, estudiante_id)
);

CREATE INDEX IF NOT EXISTS idx_grupo_miembro_grupo ON grupo_miembro(grupo_id);
CREATE INDEX IF NOT EXISTS idx_grupo_miembro_est ON grupo_miembro(estudiante_id);

-- Asignación de familia a grupo en un periodo
CREATE TABLE IF NOT EXISTS asignacion_familia_grupo (
  id BIGSERIAL PRIMARY KEY,
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  grupo_id BIGINT NOT NULL REFERENCES grupo_estudiantil(id),
  familia_id BIGINT NOT NULL REFERENCES familia(id),
  notas TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(periodo_id, grupo_id, familia_id)
);

CREATE INDEX IF NOT EXISTS idx_asignacion_familia ON asignacion_familia_grupo(familia_id);
CREATE INDEX IF NOT EXISTS idx_asignacion_grupo ON asignacion_familia_grupo(grupo_id);
