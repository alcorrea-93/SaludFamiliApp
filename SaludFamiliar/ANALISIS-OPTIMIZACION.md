# Análisis y Propuestas de Optimización - Esquema de Ingresos

## 🔍 Problemas Identificados

### 1. **Duplicación Masiva de Campos en Tablas de Miembros por Edad**

Las tablas `IngresoMiembro0a18`, `IngresoMiembro19a44`, `IngresoMiembro45Mas`, e `IngresoMiembroGestante` tienen **muchos campos duplicados** que ya existen en `IngresoFamiliaMiembro`:

- `nombre`, `apellidos`, `doc_tipo`, `doc_numero`, `parentesco`
- `fecha_nacimiento`, `edad_anios`, `sexo`, `etnia`
- `poblacion_prioritaria_1`, `poblacion_prioritaria_2`
- `hecho_victimizante`, `declaracion_desplazamiento`
- `tipo_discapacidad`, `en_programa_discapacidad`
- `familias_en_accion`, `red_unidos`, `desmovilizado`, etc.
- `sisben_puntaje`, `sisben_municipio`
- `tipo_afiliacion`, `eps_nombre`, `eps_municipio`
- `actualmente_estudiando`, `estado_escolaridad`, `ultimo_anio_aprobado`
- `estado_civil`, `posicion_ocupacional`
- `morbilidad_cronica`, `consulta_programa_ultimo_anio`, etc.
- `peso_kg`, `estatura_cm`, `imc`, `clasificacion_nutricional`
- `pa_sistolica_hombre`, `pa_diastolica_hombre`, etc.
- `fuma`, `anios_fumador`, `cigarrillos_por_dia`
- `morbilidad_sentida`, `morbilidad_sentida_describe`

**Problema**: Violación del principio DRY, riesgo de inconsistencias, mantenimiento complejo.

### 2. **Relación 1:1 Problemática**

Cada tabla de miembro por edad tiene relación 1:1 con `IngresoFamiliaMiembro`, pero:
- Un miembro puede tener datos en múltiples tablas (ej: gestante de 25 años estaría en `IngresoMiembro19a44` E `IngresoMiembroGestante`)
- La lógica de negocio se complica al tener que consultar múltiples tablas
- No hay garantía de integridad referencial clara

### 3. **Tabla de Gestantes como Caso Especial**

`IngresoMiembroGestante` puede solaparse con rangos de edad (19-44 años), creando ambigüedad en qué tabla consultar.

---

## ✅ Propuesta de Optimización

### **Opción A: Tabla Única con Campos Condicionales (Recomendada para este caso)**

**Ventaja**: Mantiene la estructura actual pero elimina duplicación.

**Estructura**:
```sql
-- Mantener IngresoFamiliaMiembro con TODOS los campos comunes
-- Las tablas por edad solo guardan campos ESPECÍFICOS de ese rango

Table IngresoMiembro0a18 {
  id bigserial [pk]
  miembro_ingreso_id bigint [not null, ref: > IngresoFamiliaMiembro.id, unique]
  -- SOLO campos específicos de 0-18 años:
  lm_exclusiva boolean
  lm_exclusiva_meses int
  progr_crec_desarrollo boolean
  eda_en_semestre boolean
  eda_num_episodios int
  eda_sabe_manejo boolean
  ira_en_semestre boolean
  ira_num_episodios int
  ira_sabe_manejo boolean
  -- Los demás campos comunes se leen de IngresoFamiliaMiembro
}

Table IngresoMiembro19a44 {
  id bigserial [pk]
  miembro_ingreso_id bigint [not null, ref: > IngresoFamiliaMiembro.id, unique]
  -- SOLO campos específicos de 19-44 años:
  citologia_alguna_vez boolean
  citologia_anio_ultima int
  citologia_resultado text
  autoexamen_mama_testiculo boolean
  -- Los demás campos comunes se leen de IngresoFamiliaMiembro
}

Table IngresoMiembro45Mas {
  id bigserial [pk]
  miembro_ingreso_id bigint [not null, ref: > IngresoFamiliaMiembro.id, unique]
  -- SOLO campos específicos de 45+ años:
  mamografia_cada2_anios boolean
  mamografia_anio_ultima int
  mamografia_resultado text
  examen_prostata_anual boolean
  examen_prostata_resultado text
  -- Los demás campos comunes se leen de IngresoFamiliaMiembro
}

Table IngresoMiembroGestante {
  id bigserial [pk]
  miembro_ingreso_id bigint [not null, ref: > IngresoFamiliaMiembro.id, unique]
  -- SOLO campos específicos de gestantes:
  cx_genitourinaria boolean
  infertilidad boolean
  gestaciones_previas int
  abortos int
  embarazo_planeado boolean
  fum date
  fpp date
  edad_gestacional_semanas int
  -- Todos los campos de salud general se leen de IngresoFamiliaMiembro
}
```

**Beneficios**:
- ✅ Elimina ~80% de campos duplicados
- ✅ Mantiene la estructura lógica por rangos de edad
- ✅ Facilita consultas (JOIN simple)
- ✅ Reduce riesgo de inconsistencias

**Desventaja**:
- ⚠️ Requiere JOINs para obtener datos completos (pero es aceptable)

---

### **Opción B: Tabla Única con Tipo de Miembro (Más Normalizada)**

Crear una sola tabla `IngresoMiembroDetalle` con un campo `tipo_miembro` (ENUM: '0a18', '19a44', '45mas', 'gestante') y campos NULL según el tipo.

**Ventaja**: Una sola tabla, menos JOINs.

**Desventaja**: Muchos campos NULL, menos legible, más complejo de validar.

---

## 🎯 Recomendación Final

**Usar Opción A** porque:
1. Mantiene la separación lógica por rangos de edad (más legible)
2. Elimina duplicación masiva
3. Facilita validaciones específicas por rango
4. El JOIN es simple y eficiente
5. Compatible con el contexto académico (formularios separados por edad)

---

## 📋 Campos que DEBEN Moverse a IngresoFamiliaMiembro

Todos estos campos deben estar **solo** en `IngresoFamiliaMiembro`:

### Identificación y Demografía
- `nombre`, `apellidos`, `doc_tipo`, `doc_otro`, `doc_numero`
- `parentesco`, `fecha_nacimiento`, `edad_anios`, `sexo`, `etnia`

### Población Prioritaria y Programas
- `poblacion_prioritaria_1`, `poblacion_prioritaria_2`
- `hecho_victimizante`, `declaracion_desplazamiento`
- `tipo_discapacidad`, `en_programa_discapacidad`
- `familias_en_accion`, `mana`, `red_unidos`, `desmovilizado`
- `otro_programa`, `otro_programa_cual`
- `adulto_mayor` (solo para 45+)

### SISBEN y SGSSS
- `encuestado`, `listado_censal`
- `sisben_puntaje`, `sisben_municipio`
- `tipo_afiliacion`, `eps_nombre`, `eps_cual`, `eps_municipio`

### Escolaridad y Ocupación
- `actualmente_estudiando`, `estado_escolaridad`
- `ultimo_anio_aprobado`, `analfabetismo`
- `estado_civil`, `posicion_ocupacional`

### Salud General
- `morbilidad_cronica`, `morbilidad_cronica_otro`
- `consulta_programa_ultimo_anio`, `consulta_medica_ult_6m`
- `motivo_consulta`
- `peso_kg`, `estatura_cm`, `signos_desnutricion`
- `sobrepeso_observacion`, `imc`, `clasificacion_nutricional`
- `planificacion_familiar`, `metodo_planificacion`
- `atencion_preventiva_odontologica`, `agudeza_visual`

### Riesgo CV y PA (comunes a varios rangos)
- `cintura_cm_hombre`, `cintura_cm_mujer`
- `cadera_cm_hombre`, `cadera_cm_mujer`
- `relacion_icc_hombre`, `relacion_icc_mujer`
- `pa_sistolica_hombre`, `pa_sistolica_mujer`
- `pa_diastolica_hombre`, `pa_diastolica_mujer`

### Tabaquismo y Morbilidad Sentida
- `fuma`, `anios_fumador`, `cigarrillos_por_dia`
- `morbilidad_sentida`, `morbilidad_sentida_describe`

### Otros
- `vacunacion_cumple_esquema` (común a varios rangos)
- `diagnostico_cie10`, `observaciones_adicionales`

---

## 📝 Campos que DEBEN Quedarse en Tablas Específicas

### IngresoMiembro0a18 (SOLO específicos de 0-18)
- `lm_exclusiva`, `lm_exclusiva_meses`
- `progr_crec_desarrollo`
- `eda_en_semestre`, `eda_num_episodios`, `eda_sabe_manejo`
- `ira_en_semestre`, `ira_num_episodios`, `ira_sabe_manejo`
- `autoexamen_mama_testiculo` (si aplica a adolescentes)

### IngresoMiembro19a44 (SOLO específicos de 19-44)
- `citologia_alguna_vez`, `citologia_anio_ultima`, `citologia_resultado`
- `autoexamen_mama_testiculo`

### IngresoMiembro45Mas (SOLO específicos de 45+)
- `mamografia_cada2_anios`, `mamografia_anio_ultima`, `mamografia_resultado`
- `examen_prostata_anual`, `examen_prostata_resultado`

### IngresoMiembroGestante (SOLO específicos de gestantes)
- Todos los campos de antecedentes obstétricos y gestación actual
- Exámenes específicos de gestación (VDRL, VIH, ecografía, etc.)
- Micronutrientes y actividades educativas de gestación

---

## 🔄 Cambios Propuestos en el Esquema

1. **Mover todos los campos comunes** de las tablas por edad → `IngresoFamiliaMiembro`
2. **Dejar solo campos específicos** en cada tabla por edad
3. **Agregar constraint UNIQUE** en `miembro_ingreso_id` para evitar duplicados
4. **Mantener la relación 1:1** pero ahora con sentido claro (detalle específico)

---

## ⚠️ Consideración Especial: Gestantes

Una gestante puede estar en rango 19-44 años. En este caso:
- `IngresoFamiliaMiembro` → datos generales
- `IngresoMiembro19a44` → datos específicos de 19-44 años
- `IngresoMiembroGestante` → datos específicos de gestación

**Esto es correcto** porque una persona puede tener múltiples características (edad Y gestación).

---

## ✅ ¿Procedemos con esta optimización?

Si estás de acuerdo, procederé a:
1. Generar el esquema SQL optimizado
2. Crear el backend Node.js con Clean Architecture + Vertical Slicing
3. Implementar CRUD completo para todas las tablas de Ingreso

¿Te parece bien esta propuesta o prefieres mantener el esquema original?
