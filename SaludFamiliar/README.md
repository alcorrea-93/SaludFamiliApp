# Salud Familiar - Backend

Backend Node.js con **Clean Architecture** y **Vertical Slicing** por features. CRUD completo para el proyecto academico de Salud Familiar.

## Requisitos

- Node.js 18+
- PostgreSQL (local o nube)

## Instalacion

```bash
cd SaludFamiliar
npm install
```

## Configuracion

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Edita `.env`:
   ```
   DATABASE_URL=postgresql://usuario:password@localhost:5432/salud_familiar
   PORT=3000
   NODE_ENV=development
   ```

## Crear la base de datos

1. Crea la base en PostgreSQL:
   ```sql
   CREATE DATABASE salud_familiar;
   ```
2. Ejecuta las migraciones en orden:
   ```bash
   psql -U postgres -d salud_familiar -f migrations/001_tablas_base.sql
   psql -U postgres -d salud_familiar -f migrations/002_ingreso_familia.sql
   psql -U postgres -d salud_familiar -f migrations/003_ingreso_vivienda.sql
   psql -U postgres -d salud_familiar -f migrations/004_ingreso_familia_miembro.sql
   psql -U postgres -d salud_familiar -f migrations/005_ingreso_miembro_por_edad.sql
   psql -U postgres -d salud_familiar -f migrations/006_integrante_familia.sql
   psql -U postgres -d salud_familiar -f migrations/007_entidades_academicas.sql
   psql -U postgres -d salud_familiar -f migrations/008_relaciones_academicas.sql
   psql -U postgres -d salud_familiar -f migrations/009_seguimiento.sql
   ```

## Ejecutar

```bash
npm start
# o con recarga en desarrollo:
npm run dev
```

## Flujo del sistema

```
1. Crear Territorio -> Vereda -> Familia -> IntegranteFamilia
2. Crear PeriodoAcademico
3. Crear IngresoFamilia (+ vivienda, miembros, detalles por edad)
4. Crear Profesor, Estudiante, GrupoEstudiantil
5. Asignar: ProfesorAsignado, GrupoMiembro, AsignacionFamiliaGrupo
6. Crear Seguimientos con SeguimientoParticipante
```

## API - Rutas CRUD

### Catalogos Territoriales

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Territorio | `/api/territorios` | GET, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Vereda | `/api/veredas` | GET (?territorio_id), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Familias

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Familia | `/api/familias` | GET (?vereda_id, q), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Integrante familia | `/api/integrantes-familia` | GET, GET /:id, GET /por-familia/:familiaId, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Estado familia | `/api/estados-familia` | GET, GET /:id, POST, PUT /:id, DELETE /:id |
| Historial estado | `/api/historial-estado-familia` | GET /por-familia/:familiaId, GET /:id, POST, PUT /:id, DELETE /:id |

### Periodos

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Periodo academico | `/api/periodos-academicos` | GET, GET /activo, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Academicos

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Profesor | `/api/profesores` | GET (?q), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Estudiante | `/api/estudiantes` | GET (?q), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Asignatura | `/api/asignaturas` | GET, GET /:id, POST, PUT /:id, DELETE /:id |
| Grupo estudiantil | `/api/grupos-estudiantiles` | GET, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Profesor asignado | `/api/profesores-asignados` | GET (?periodo_id, grupo_id, profesor_id), GET /:id, POST, PUT /:id, DELETE /:id |
| Grupo miembro | `/api/grupo-miembros` | GET (?periodo_id, grupo_id), GET /grupo/:grupoId/periodo/:periodoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Asignacion familia-grupo | `/api/asignacion-familia-grupo` | GET (?periodo_id, grupo_id, familia_id), GET /grupo/:grupoId/periodo/:periodoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Modulo de Ingresos

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Ingreso familia | `/api/ingreso-familia` | GET, GET /:id, GET /:id/completo, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda | `/api/ingreso-vivienda` | GET, GET /:id, GET /por-ingreso/:ingresoId, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda animal | `/api/ingreso-vivienda-animal` | GET /por-vivienda/:viviendaId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso familia miembro | `/api/ingreso-familia-miembro` | GET (?ingreso_id), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 0-18 | `/api/ingreso-miembro-0a18` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 19-44 | `/api/ingreso-miembro-19a44` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 45+ | `/api/ingreso-miembro-45mas` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro gestante | `/api/ingreso-miembro-gestante` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Modulo de Seguimiento

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Seguimiento | `/api/seguimientos` | GET (?periodo_id, familia_id, grupo_id, profesor_id), GET /:id, GET /:id/completo, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Seguimiento participante | `/api/seguimiento-participantes` | GET /por-seguimiento/:seguimientoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Familias perdidas | `/api/familias-perdidas` | GET (?familia_id, periodo_id), GET /:id, POST, PUT /:id, DELETE /:id |

### Endpoints Especiales

- **Health:** `GET /health`
- **Periodo activo:** `GET /api/periodos-academicos/activo`
- **Ingreso completo:** `GET /api/ingreso-familia/:id/completo` (ingreso + vivienda + animales + miembros + detalles edad)
- **Seguimiento completo:** `GET /api/seguimientos/:id/completo` (seguimiento + participantes con datos de estudiante)
- **Miembros del grupo:** `GET /api/grupo-miembros/grupo/:grupoId/periodo/:periodoId`
- **Familias del grupo:** `GET /api/asignacion-familia-grupo/grupo/:grupoId/periodo/:periodoId`

### Paginacion

Los endpoints de listado soportan `?page=1&limit=20` (max 100):

```json
{ "total": 45, "page": 1, "limit": 20, "data": [...] }
```

## Estructura

```
src/
  config/              # Conexion BD
  models/              # Modelos Sequelize y relaciones
  shared/              # Helpers HTTP, middleware de errores
  features/
    territorio/        # Catalogo territorial
    vereda/
    familia/           # Familias
    integrante-familia/
    estado-familia/
    historial-estado-familia/
    periodo-academico/ # Periodos
    profesor/          # Academicos
    estudiante/
    asignatura/
    grupo-estudiantil/
    profesor-asignado/
    grupo-miembro/
    asignacion-familia-grupo/
    ingreso-familia/   # Modulo Ingreso
    ingreso-vivienda/
    ingreso-vivienda-animal/
    ingreso-familia-miembro/
    ingreso-miembro-0a18/
    ingreso-miembro-19a44/
    ingreso-miembro-45mas/
    ingreso-miembro-gestante/
    seguimiento/       # Modulo Seguimiento
    seguimiento-participante/
    familia-perdida-registro/
migrations/            # SQL para crear tablas (001..009)
```

## Migraciones

| Archivo | Contenido |
|---------|-----------|
| 001 | territorio, vereda, familia, periodo_academico |
| 002 | ingreso_familia |
| 003 | ingreso_vivienda, ingreso_vivienda_animal |
| 004 | ingreso_familia_miembro |
| 005 | ingreso_miembro_0a18, 19a44, 45mas, gestante |
| 006 | integrante_familia, estado_familia, historial_estado_familia |
| 007 | profesor, estudiante, asignatura, grupo_estudiantil (+ enums) |
| 008 | profesor_asignado, grupo_miembro, asignacion_familia_grupo |
| 009 | seguimiento, seguimiento_participante, familia_perdida_registro |
