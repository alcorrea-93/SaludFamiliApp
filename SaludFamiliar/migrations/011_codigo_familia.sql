-- Identificador visible compuesto: municipio + vereda + número de familia
-- Ej: "05001-003-0042" (cod_municipio - num_vereda - num_familia)
ALTER TABLE familia ADD COLUMN IF NOT EXISTS codigo_familia TEXT;
ALTER TABLE familia ADD COLUMN IF NOT EXISTS numero_familia INT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_familia_codigo ON familia(codigo_familia) WHERE codigo_familia IS NOT NULL;

COMMENT ON COLUMN familia.codigo_familia IS 'Identificador compuesto: municipio + vereda + número de familia. Obligatorio.';
COMMENT ON COLUMN familia.numero_familia IS 'Número secuencial de la familia dentro de la vereda.';
