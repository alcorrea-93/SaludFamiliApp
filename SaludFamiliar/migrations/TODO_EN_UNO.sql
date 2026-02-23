-- =====================================================
-- SCRIPT COMPLETO - Todas las migraciones (001 a 009)
-- Pegar todo en pgAdmin Query Tool y ejecutar con F5
-- =====================================================

-- === 001: Tablas base ===
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

-- === 002: Ingreso familia ===
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

-- === 003: Ingreso vivienda ===
CREATE TABLE IF NOT EXISTS ingreso_vivienda (
  id BIGSERIAL PRIMARY KEY,
  ingreso_id BIGINT NOT NULL REFERENCES ingreso_familia(id) ON DELETE CASCADE,
  periodo_academico TEXT,
  fecha_apertura DATE,
  nombre_encuestador TEXT,
  vivienda_numero TEXT,
  num_familias_en_vivienda INT,
  municipio TEXT,
  corregimiento TEXT,
  vereda TEXT,
  barrio TEXT,
  zona_ubicacion TEXT,
  direccion TEXT,
  telefono TEXT,
  distancia_minutos_cabecera INT,
  medio_transporte TEXT,
  tipo_vivienda TEXT,
  estado_vivienda TEXT,
  vivienda_es TEXT,
  vivienda_es_otro TEXT,
  uso_vivienda TEXT,
  uso_vivienda_otro TEXT,
  tipo_alumbrado TEXT,
  pisos TEXT,
  pisos_otro TEXT,
  paredes TEXT,
  paredes_otro TEXT,
  techo TEXT,
  techo_otro TEXT,
  dispositivos_electricos TEXT,
  electricos_aislados BOOLEAN,
  electricos_riesgo BOOLEAN,
  tipo_fuente_agua TEXT,
  fuente_superficial TEXT,
  estado_fuente TEXT,
  conexion_acueducto TEXT,
  calidad_agua TEXT,
  tratamiento_agua TEXT,
  artefacto_excretas TEXT,
  artefacto_excretas_otro TEXT,
  disposicion_excretas TEXT,
  disposicion_excretas_otro TEXT,
  disposicion_aguas_grises TEXT,
  disposicion_aguas_grises_otro TEXT,
  artefacto_basuras TEXT,
  artefacto_basuras_otro TEXT,
  recoleccion_vivienda TEXT,
  realiza_separacion BOOLEAN,
  realiza_tratamiento TEXT,
  disposicion_final_basuras TEXT,
  hacinamiento BOOLEAN,
  num_cuartos INT,
  buen_estado_higienico BOOLEAN,
  roedores_insectos BOOLEAN,
  iluminacion_adecuada BOOLEAN,
  ventilacion_adecuada BOOLEAN,
  espacios_convivencia BOOLEAN,
  diseno_estructuras_adecuadas BOOLEAN,
  servicios_basicos_buena_calidad BOOLEAN,
  terreno_estable BOOLEAN,
  cocina_dispone BOOLEAN,
  cocina_independiente BOOLEAN,
  cocina_buenas_condiciones BOOLEAN,
  fogon_gas BOOLEAN,
  fogon_electrico BOOLEAN,
  fogon_abierto_combustible BOOLEAN,
  tiene_animales BOOLEAN,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingreso_vivienda_animal (
  id BIGSERIAL PRIMARY KEY,
  ingreso_vivienda_id BIGINT NOT NULL REFERENCES ingreso_vivienda(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  descripcion_otro TEXT,
  tiene BOOLEAN,
  cantidad INT,
  vacunados INT,
  esterilizados INT,
  desparasitados INT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ingreso_vivienda_id, tipo)
);

CREATE INDEX IF NOT EXISTS idx_ingreso_vivienda_ingreso ON ingreso_vivienda(ingreso_id);
CREATE INDEX IF NOT EXISTS idx_ingreso_vivienda_animal_vivienda ON ingreso_vivienda_animal(ingreso_vivienda_id);

-- === 004: Ingreso familia miembro ===
CREATE TABLE IF NOT EXISTS ingreso_familia_miembro (
  id BIGSERIAL PRIMARY KEY,
  ingreso_id BIGINT NOT NULL REFERENCES ingreso_familia(id) ON DELETE CASCADE,
  fecha_apertura DATE,
  vivienda_numero TEXT,
  numero_familia TEXT,
  apellidos_familia TEXT,
  num_en_familia INT,
  doc_tipo TEXT,
  doc_numero TEXT,
  nombres TEXT,
  apellidos TEXT,
  parentesco TEXT,
  fecha_nacimiento DATE,
  edad_anios INT,
  edad_meses INT,
  edad_dias INT,
  sexo TEXT,
  poblacion TEXT,
  estado_civil TEXT,
  actualmente_estudiando BOOLEAN,
  estado_escolaridad TEXT,
  ultimo_anio_aprobado TEXT,
  posicion_ocupacional TEXT,
  etnia TEXT,
  doc_otro TEXT,
  poblacion_prioritaria_1 TEXT,
  poblacion_prioritaria_2 TEXT,
  hecho_victimizante TEXT,
  declaracion_desplazamiento BOOLEAN,
  tipo_discapacidad TEXT,
  en_programa_discapacidad BOOLEAN,
  familias_en_accion BOOLEAN,
  mana BOOLEAN,
  red_unidos BOOLEAN,
  desmovilizado BOOLEAN,
  adulto_mayor BOOLEAN,
  otro_programa BOOLEAN,
  otro_programa_cual TEXT,
  encuestado BOOLEAN,
  listado_censal BOOLEAN,
  sisben_puntaje NUMERIC,
  sisben_municipio TEXT,
  tipo_afiliacion TEXT,
  eps_nombre TEXT,
  eps_cual TEXT,
  eps_municipio TEXT,
  analfabetismo BOOLEAN,
  morbilidad_cronica TEXT,
  morbilidad_cronica_otro TEXT,
  consulta_programa_ultimo_anio BOOLEAN,
  consulta_medica_ult_6m BOOLEAN,
  motivo_consulta TEXT,
  peso_kg NUMERIC,
  estatura_cm NUMERIC,
  signos_desnutricion BOOLEAN,
  sobrepeso_observacion BOOLEAN,
  imc NUMERIC,
  clasificacion_nutricional TEXT,
  planificacion_familiar BOOLEAN,
  metodo_planificacion TEXT,
  atencion_preventiva_odontologica BOOLEAN,
  agudeza_visual BOOLEAN,
  cintura_cm_hombre NUMERIC,
  cintura_cm_mujer NUMERIC,
  cadera_cm_hombre NUMERIC,
  cadera_cm_mujer NUMERIC,
  relacion_icc_hombre NUMERIC,
  relacion_icc_mujer NUMERIC,
  pa_sistolica_hombre INT,
  pa_sistolica_mujer INT,
  pa_diastolica_hombre INT,
  pa_diastolica_mujer INT,
  autoexamen_mama_testiculo BOOLEAN,
  vacunacion_cumple_esquema BOOLEAN,
  citologia_alguna_vez BOOLEAN,
  citologia_anio_ultima INT,
  citologia_resultado TEXT,
  mamografia_cada2_anios BOOLEAN,
  mamografia_anio_ultima INT,
  mamografia_resultado TEXT,
  examen_prostata_anual BOOLEAN,
  examen_prostata_resultado TEXT,
  fuma BOOLEAN,
  anios_fumador INT,
  cigarrillos_por_dia INT,
  morbilidad_sentida BOOLEAN,
  morbilidad_sentida_describe TEXT,
  diagnostico_cie10 TEXT,
  observaciones_adicionales TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_ingreso_fam_miembro_ingreso_num ON ingreso_familia_miembro(ingreso_id, num_en_familia);
CREATE INDEX IF NOT EXISTS idx_ingreso_fam_miembro_ingreso ON ingreso_familia_miembro(ingreso_id);

-- === 005: Ingreso miembros por edad ===
CREATE TABLE IF NOT EXISTS ingreso_miembro_0a18 (
  id BIGSERIAL PRIMARY KEY,
  miembro_ingreso_id BIGINT NOT NULL UNIQUE REFERENCES ingreso_familia_miembro(id) ON DELETE CASCADE,
  lm_exclusiva BOOLEAN,
  lm_exclusiva_meses INT,
  progr_crec_desarrollo BOOLEAN,
  eda_en_semestre BOOLEAN,
  eda_num_episodios INT,
  eda_sabe_manejo BOOLEAN,
  ira_en_semestre BOOLEAN,
  ira_num_episodios INT,
  ira_sabe_manejo BOOLEAN,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingreso_miembro_19a44 (
  id BIGSERIAL PRIMARY KEY,
  miembro_ingreso_id BIGINT NOT NULL UNIQUE REFERENCES ingreso_familia_miembro(id) ON DELETE CASCADE,
  observaciones_adicionales TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingreso_miembro_45mas (
  id BIGSERIAL PRIMARY KEY,
  miembro_ingreso_id BIGINT NOT NULL UNIQUE REFERENCES ingreso_familia_miembro(id) ON DELETE CASCADE,
  observaciones_adicionales TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingreso_miembro_gestante (
  id BIGSERIAL PRIMARY KEY,
  miembro_ingreso_id BIGINT NOT NULL UNIQUE REFERENCES ingreso_familia_miembro(id) ON DELETE CASCADE,
  cx_genitourinaria BOOLEAN,
  infertilidad BOOLEAN,
  cardiopatia BOOLEAN,
  nefropatia BOOLEAN,
  violencia BOOLEAN,
  tuberculosis BOOLEAN,
  diabetes BOOLEAN,
  hipertension BOOLEAN,
  preeclampsia BOOLEAN,
  eclampsia BOOLEAN,
  otra_cond_med_grave BOOLEAN,
  otra_cond_med_cual TEXT,
  gestaciones_previas INT,
  abortos INT,
  ectopicos INT,
  partos_vaginales INT,
  cesareas INT,
  nacidos_muertos INT,
  bajo_peso_nacer INT,
  macrosomia INT,
  gemelares INT,
  muertos_primera_sem INT,
  muertos_despues_primera_sem INT,
  fecha_fin_ultima_gestacion DATE,
  embarazo_planeado BOOLEAN,
  planificaba BOOLEAN,
  falla_metodo BOOLEAN,
  metodo_planificacion TEXT,
  fum DATE,
  fum_confiable BOOLEAN,
  eco_menor_20s BOOLEAN,
  fpp DATE,
  edad_gestacional_semanas INT,
  edad_gestacional_dias INT,
  fumadora_activa BOOLEAN,
  fumadora_pasiva BOOLEAN,
  consume_alcohol BOOLEAN,
  consume_drogas BOOLEAN,
  violencia_actual BOOLEAN,
  controles_prenatales BOOLEAN,
  trimestre_ingreso INT,
  num_controles_prenatales INT,
  riesgo TEXT,
  vacuna_antirrubeola_completa BOOLEAN,
  vacuna_antitetanica_completa BOOLEAN,
  odonto_realizado BOOLEAN,
  odonto_resultado TEXT,
  mamas_realizado BOOLEAN,
  mamas_resultado TEXT,
  citologia_realizado BOOLEAN,
  citologia_resultado TEXT,
  hemoclasificacion_realizado BOOLEAN,
  hemoclasificacion_resultado TEXT,
  hemoglobina_realizado BOOLEAN,
  hemoglobina_resultado TEXT,
  glicemia_realizado BOOLEAN,
  glicemia_resultado TEXT,
  uroanalisis_realizado BOOLEAN,
  uroanalisis_resultado TEXT,
  vdrl_realizado BOOLEAN,
  vdrl_resultado TEXT,
  vdrl_2_muestra_realizado BOOLEAN,
  vdrl_2_muestra_resultado TEXT,
  vih_realizado BOOLEAN,
  vih_resultado TEXT,
  hepatitis_b_realizado BOOLEAN,
  hepatitis_b_resultado TEXT,
  toxoplasmosis_realizado BOOLEAN,
  toxoplasmosis_resultado TEXT,
  malaria_realizado BOOLEAN,
  malaria_resultado TEXT,
  chagas_realizado BOOLEAN,
  chagas_resultado TEXT,
  cultivo_egb_realizado BOOLEAN,
  cultivo_egb_resultado TEXT,
  ecografia_realizado BOOLEAN,
  ecografia_resultado TEXT,
  grupo TEXT,
  rh TEXT,
  acido_folico BOOLEAN,
  calcio BOOLEAN,
  sulfato_ferroso BOOLEAN,
  consejeria_lactancia BOOLEAN,
  preparacion_parto BOOLEAN,
  peso_kg NUMERIC,
  estatura_cm NUMERIC,
  pa_sistolica INT,
  pa_diastolica INT,
  movimientos_fetales BOOLEAN,
  morbilidad_sentida BOOLEAN,
  morbilidad_sentida_describe TEXT,
  observaciones_adicionales TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ingreso_miembro_0a18_miembro ON ingreso_miembro_0a18(miembro_ingreso_id);
CREATE INDEX IF NOT EXISTS idx_ingreso_miembro_19a44_miembro ON ingreso_miembro_19a44(miembro_ingreso_id);
CREATE INDEX IF NOT EXISTS idx_ingreso_miembro_45mas_miembro ON ingreso_miembro_45mas(miembro_ingreso_id);
CREATE INDEX IF NOT EXISTS idx_ingreso_miembro_gestante_miembro ON ingreso_miembro_gestante(miembro_ingreso_id);

-- === 006: Integrante familia + estados ===
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

ALTER TABLE familia
  ADD CONSTRAINT fk_familia_jefe_integrante
  FOREIGN KEY (jefe_integrante_id) REFERENCES integrante_familia(id)
  ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS estado_familia (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL
);

INSERT INTO estado_familia (codigo, nombre) VALUES
  ('ACTIVA', 'Activa'),
  ('PERDIDA', 'Perdida')
ON CONFLICT (codigo) DO NOTHING;

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

-- === 007: Entidades academicas ===
DO $$ BEGIN
  CREATE TYPE estado_matricula AS ENUM ('INSCRITA','APROBADA','REPROBADA','RETIRADA');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE rol_grupo AS ENUM ('INTEGRANTE','LIDER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE rol_participacion AS ENUM ('OBSERVADOR','ACTIVO','LIDER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

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

CREATE TABLE IF NOT EXISTS asignatura (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  creditos INT
);

CREATE TABLE IF NOT EXISTS grupo_estudiantil (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  codigo TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_grupo_codigo
  ON grupo_estudiantil(codigo) WHERE codigo IS NOT NULL;

-- === 008: Relaciones academicas ===
CREATE TABLE IF NOT EXISTS profesor_asignado (
  id BIGSERIAL PRIMARY KEY,
  periodo_id BIGINT NOT NULL REFERENCES periodo_academico(id),
  grupo_id BIGINT NOT NULL REFERENCES grupo_estudiantil(id),
  profesor_id BIGINT NOT NULL REFERENCES profesor(id),
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(periodo_id, grupo_id)
);

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

-- === 009: Seguimiento ===
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

CREATE TABLE IF NOT EXISTS seguimiento_participante (
  id BIGSERIAL PRIMARY KEY,
  seguimiento_id BIGINT NOT NULL REFERENCES seguimiento(id) ON DELETE CASCADE,
  estudiante_id BIGINT NOT NULL REFERENCES estudiante(id),
  rol TEXT NOT NULL DEFAULT 'ACTIVO',
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(seguimiento_id, estudiante_id)
);

CREATE INDEX IF NOT EXISTS idx_seg_participante_seg ON seguimiento_participante(seguimiento_id);

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

-- === DATOS INICIALES (opcional, para probar) ===
-- INSERT INTO territorio (nombre, departamento, municipio) VALUES ('Territorio 1', 'Antioquia', 'Medellin');
-- INSERT INTO vereda (territorio_id, nombre) VALUES (1, 'Vereda ejemplo');
-- INSERT INTO familia (vereda_id, nombre_familia) VALUES (1, 'Familia ejemplo');
-- INSERT INTO periodo_academico (anio, semestre, codigo) VALUES (2025, 1, '2025-1');
