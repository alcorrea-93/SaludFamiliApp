# Salud Familiar - Backend (Ingresos)

Backend Node.js con **Clean Architecture** y **Vertical Slicing** por features. CRUD para el modulo de Ingresos del proyecto academico.

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
2. Edita `.env` y configura `DATABASE_URL` cuando tengas la base de datos:
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
2. Ejecuta las migraciones en orden (desde la raiz del proyecto):
   ```bash
   psql -U postgres -d salud_familiar -f migrations/001_tablas_base.sql
   psql -U postgres -d salud_familiar -f migrations/002_ingreso_familia.sql
   psql -U postgres -d salud_familiar -f migrations/003_ingreso_vivienda.sql
   psql -U postgres -d salud_familiar -f migrations/004_ingreso_familia_miembro.sql
   psql -U postgres -d salud_familiar -f migrations/005_ingreso_miembro_por_edad.sql
   ```
   O abre cada archivo en DBeaver/pgAdmin y ejecutalo en orden.

3. (Opcional) Inserta datos minimos para probar: en `001_tablas_base.sql` hay comentarios con INSERTs de ejemplo (territorio, vereda, familia, periodo).

## Ejecutar

```bash
npm start
# o con recarga en desarrollo:
npm run dev
```

El servidor quedara en `http://localhost:3000`. Si la BD no existe o no se puede conectar, el arranque fallara con un mensaje claro.

## API - Rutas CRUD

### Entidades Base

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Territorio | `/api/territorios` | GET (?activo, page, limit), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Vereda | `/api/veredas` | GET (?territorio_id, activa, page, limit), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Familia | `/api/familias` | GET (?vereda_id, q, page, limit), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Periodo academico | `/api/periodos-academicos` | GET (?activo, page, limit), GET /activo, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Modulo de Ingresos

| Recurso | Base path | Metodos |
|---------|-----------|---------|
| Ingreso familia | `/api/ingreso-familia` | GET (?periodo_id, familia_id, page, limit), GET /:id, GET /:id/completo, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda | `/api/ingreso-vivienda` | GET (?ingreso_id, page, limit), GET /:id, GET /por-ingreso/:ingresoId, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda animal | `/api/ingreso-vivienda-animal` | GET /por-vivienda/:viviendaId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso familia miembro | `/api/ingreso-familia-miembro` | GET (?ingreso_id, page, limit), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 0-18 | `/api/ingreso-miembro-0a18` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 19-44 | `/api/ingreso-miembro-19a44` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 45+ | `/api/ingreso-miembro-45mas` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro gestante | `/api/ingreso-miembro-gestante` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

### Endpoints Especiales

- **Health:** `GET /health` -> `{ "ok": true }`
- **Periodo activo:** `GET /api/periodos-academicos/activo` -> Retorna el periodo academico activo mas reciente
- **Ingreso completo:** `GET /api/ingreso-familia/:id/completo` -> Retorna el ingreso con toda la informacion anidada (vivienda + animales + miembros + detalles por edad/gestante)
- **Buscar familias:** `GET /api/familias?q=texto` -> Busca familias por nombre (ILIKE)

### Paginacion

Los endpoints de listado soportan paginacion con los query params `page` (default: 1) y `limit` (default: 20, max: 100). La respuesta incluye:

```json
{
  "total": 45,
  "page": 1,
  "limit": 20,
  "data": [...]
}
```

## Estructura (Vertical Slicing + Clean Architecture)

```
src/
  config/          # Conexion BD
  models/          # Modelos Sequelize y relaciones
  shared/          # Helpers HTTP, middleware de errores
  features/        # Una carpeta por recurso
    territorio/
    vereda/
    familia/
    periodo-academico/
    ingreso-familia/
    ingreso-vivienda/
    ingreso-vivienda-animal/
    ingreso-familia-miembro/
    ingreso-miembro-0a18/
    ingreso-miembro-19a44/
    ingreso-miembro-45mas/
    ingreso-miembro-gestante/
migrations/        # SQL para crear tablas (ejecutar cuando tengas la BD)
```

Cada feature contiene:
- `*.repository.js` - Acceso a datos (Sequelize)
- `*.use-cases.js` - Logica de negocio
- `*.controller.js` - Manejo HTTP (request/response)
- `*.routes.js` - Definicion de rutas Express

## Esquema (Option A)

- **IngresoFamiliaMiembro** concentra todos los campos comunes (identificacion, demografia, SISBEN, salud, etc.).
- Las tablas por edad (0a18, 19a44, 45mas, gestante) solo tienen campos **especificos** y `miembro_ingreso_id` (FK a IngresoFamiliaMiembro).
- Detalle en `ANALISIS-OPTIMIZACION.md`.

## Manejo de Errores

El backend incluye un middleware global de errores que maneja:
- JSON invalido en el body -> 400
- Registros duplicados (unique constraint) -> 409
- Validaciones de Sequelize -> 400
- FK invalidas -> 400
- Rutas no encontradas -> 404
- Errores internos -> 500
