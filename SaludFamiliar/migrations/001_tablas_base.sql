-- Tablas base necesarias para FKs de Ingreso
-- Ejecutar primero cuando crees la BD

CREATE TABLE IF NOT EXISTS territorio (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  departamento TEXT,
  municipio TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW(),
  activo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS vereda (
  id BIGSERIAL PRIMARY KEY,
  territorio_id BIGINT NOT NULL REFERENCES territorio(id),
  nombre TEXT NOT NULL,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW(),
  activa BOOLEAN DEFAULT true,
  UNIQUE(territorio_id, nombre)
);

CREATE TABLE IF NOT EXISTS familia (
  id BIGSERIAL PRIMARY KEY,
  vereda_id BIGINT NOT NULL REFERENCES vereda(id),
  nombre_familia TEXT NOT NULL,
  jefe_integrante_id BIGINT,
  telefono_contacto TEXT,
  observaciones TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vereda_id, nombre_familia)
);

CREATE TABLE IF NOT EXISTS periodo_academico (
  id BIGSERIAL PRIMARY KEY,
  anio INT NOT NULL,
  semestre INT NOT NULL,
  codigo TEXT NOT NULL UNIQUE,
  fecha_inicio DATE,
  fecha_fin DATE,
  activo BOOLEAN NOT NULL DEFAULT true,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Datos mínimos para poder crear ingresos (opcional)
-- INSERT INTO territorio (nombre) VALUES ('Default');
-- INSERT INTO vereda (territorio_id, nombre) VALUES (1, 'Default');
-- INSERT INTO familia (vereda_id, nombre_familia) VALUES (1, 'Familia ejemplo');
-- INSERT INTO periodo_academico (anio, semestre, codigo) VALUES (2025, 1, '2025-1');
