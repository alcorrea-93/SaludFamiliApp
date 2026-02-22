-- Enums personalizados
DO $$ BEGIN
  CREATE TYPE estado_matricula AS ENUM ('INSCRITA','APROBADA','REPROBADA','RETIRADA');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE rol_grupo AS ENUM ('INTEGRANTE','LIDER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE rol_participacion AS ENUM ('OBSERVADOR','ACTIVO','LIDER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Profesor
CREATE TABLE IF NOT EXISTS profesor (
  id BIGSERIAL PRIMARY KEY,
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  documento_tipo TEXT,
  documento_numero TEXT,
  correo TEXT,
  telefono TEXT,
  activo BOOLEAN NOT NULL DEFAULT true,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_profesor_doc
  ON profesor(documento_tipo, documento_numero)
  WHERE documento_numero IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profesor_correo
  ON profesor(correo) WHERE correo IS NOT NULL;

-- Estudiante
CREATE TABLE IF NOT EXISTS estudiante (
  id BIGSERIAL PRIMARY KEY,
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  documento_tipo TEXT,
  documento_numero TEXT,
  correo TEXT,
  telefono TEXT,
  activo BOOLEAN NOT NULL DEFAULT true,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_estudiante_doc
  ON estudiante(documento_tipo, documento_numero)
  WHERE documento_numero IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_estudiante_correo
  ON estudiante(correo) WHERE correo IS NOT NULL;

-- Asignatura
CREATE TABLE IF NOT EXISTS asignatura (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  creditos INT
);

-- Grupo estudiantil
CREATE TABLE IF NOT EXISTS grupo_estudiantil (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  codigo TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_grupo_codigo
  ON grupo_estudiantil(codigo) WHERE codigo IS NOT NULL;
