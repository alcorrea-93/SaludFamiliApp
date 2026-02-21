CREATE TABLE IF NOT EXISTS ingreso_familia (
  id BIGSERIAL PRIMARY KEY,
  familia_id BIGINT NOT NULL UNIQUE REFERENCES familia(id),
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  fecha_ingreso DATE NOT NULL,
  observaciones_docente TEXT,
  aspectos_trabajados TEXT,
  temas_a_trabajar TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ingreso_familia_periodo ON ingreso_familia(periodo_id);
