-- Integrantes permanentes de una familia (catálogo maestro)
CREATE TABLE IF NOT EXISTS integrante_familia (
  id BIGSERIAL PRIMARY KEY,
  familia_id BIGINT NOT NULL REFERENCES familia(id) ON DELETE CASCADE,
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  documento_tipo TEXT,
  documento_numero TEXT,
  fecha_nacimiento DATE,
  telefono TEXT,
  correo TEXT,
  es_jefe BOOLEAN NOT NULL DEFAULT false,
  activo BOOLEAN NOT NULL DEFAULT true,
  eps TEXT,
  sisben TEXT,
  enfermedad TEXT,
  enfermedad_codigo TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_integrante_doc
  ON integrante_familia(documento_tipo, documento_numero)
  WHERE documento_numero IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_integrante_familia ON integrante_familia(familia_id);

-- FK de familia.jefe_integrante_id hacia integrante_familia
ALTER TABLE familia
  ADD CONSTRAINT fk_familia_jefe_integrante
  FOREIGN KEY (jefe_integrante_id) REFERENCES integrante_familia(id)
  ON DELETE SET NULL;

-- Estado de familia (catálogo)
CREATE TABLE IF NOT EXISTS estado_familia (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL
);

INSERT INTO estado_familia (codigo, nombre) VALUES
  ('ACTIVA', 'Activa'),
  ('PERDIDA', 'Perdida')
ON CONFLICT (codigo) DO NOTHING;

-- Historial de estados de una familia
CREATE TABLE IF NOT EXISTS historial_estado_familia (
  id BIGSERIAL PRIMARY KEY,
  familia_id BIGINT NOT NULL REFERENCES familia(id) ON DELETE CASCADE,
  estado_id BIGINT NOT NULL REFERENCES estado_familia(id),
  fecha_desde DATE NOT NULL,
  fecha_hasta DATE,
  creado_por TEXT,
  observaciones TEXT
);

CREATE INDEX IF NOT EXISTS idx_historial_estado_familia ON historial_estado_familia(familia_id);
