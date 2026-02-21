# Salud Familiar - Backend (Ingresos)

Backend Node.js con **Clean Architecture** y **Vertical Slicing** por features. CRUD para el módulo de Ingresos del proyecto académico.

## Requisitos

- Node.js 18+
- PostgreSQL (local o nube)

## Instalación

```bash
cd D:\Alex\Desktop\SaludFamiliar
npm install
```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   copy .env.example .env
   ```
2. Edita `.env` y configura `DATABASE_URL` cuando tengas la base de datos:
   ```
   DATABASE_URL=postgresql://usuario:password@localhost:5432/salud_familiar
   PORT=3000
   ```

## Crear la base de datos

1. Crea la base en PostgreSQL:
   ```sql
   CREATE DATABASE salud_familiar;
   ```
2. Ejecuta las migraciones en orden (desde la raíz del proyecto):
   ```bash
   psql -U postgres -d salud_familiar -f migrations/001_tablas_base.sql
   psql -U postgres -d salud_familiar -f migrations/002_ingreso_familia.sql
   psql -U postgres -d salud_familiar -f migrations/003_ingreso_vivienda.sql
   psql -U postgres -d salud_familiar -f migrations/004_ingreso_familia_miembro.sql
   psql -U postgres -d salud_familiar -f migrations/005_ingreso_miembro_por_edad.sql
   ```
   O abre cada archivo en DBeaver/pgAdmin y ejecútalo en orden.

3. (Opcional) Inserta datos mínimos para probar: en `001_tablas_base.sql` hay comentarios con INSERTs de ejemplo (territorio, vereda, familia, periodo).

## Ejecutar

```bash
npm start
# o con recarga en desarrollo:
npm run dev
```

El servidor quedará en `http://localhost:3000`. Si la BD no existe o no se puede conectar, el arranque fallará con un mensaje claro.

## API - Rutas CRUD

| Recurso | Base path | Métodos |
|---------|-----------|---------|
| Ingreso familia | `/api/ingreso-familia` | GET, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda | `/api/ingreso-vivienda` | GET, GET /:id, GET /por-ingreso/:ingresoId, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso vivienda animal | `/api/ingreso-vivienda-animal` | GET /por-vivienda/:viviendaId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso familia miembro | `/api/ingreso-familia-miembro` | GET (?ingreso_id=), GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 0-18 | `/api/ingreso-miembro-0a18` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 19-44 | `/api/ingreso-miembro-19a44` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro 45+ | `/api/ingreso-miembro-45mas` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |
| Ingreso miembro gestante | `/api/ingreso-miembro-gestante` | GET /por-miembro/:miembroIngresoId, GET /:id, POST, PUT /:id, PATCH /:id, DELETE /:id |

- **Health:** `GET /health` → `{ "ok": true }`

## Estructura (Vertical Slicing + Clean Architecture)

```
src/
  config/          # Conexión BD
  models/          # Modelos Sequelize y relaciones (Option A)
  shared/          # Helpers HTTP
  features/        # Una carpeta por recurso
    ingreso-familia/
      ingreso-familia.repository.js
      ingreso-familia.use-cases.js
      ingreso-familia.controller.js
      ingreso-familia.routes.js
    ingreso-vivienda/
    ingreso-vivienda-animal/
    ingreso-familia-miembro/
    ingreso-miembro-0a18/
    ingreso-miembro-19a44/
    ingreso-miembro-45mas/
    ingreso-miembro-gestante/
migrations/        # SQL para crear tablas (ejecutar cuando tengas la BD)
```

## Esquema (Option A)

- **IngresoFamiliaMiembro** concentra todos los campos comunes (identificación, demografía, SISBEN, salud, etc.).
- Las tablas por edad (0a18, 19a44, 45mas, gestante) solo tienen campos **específicos** y `miembro_ingreso_id` (FK a IngresoFamiliaMiembro).
- Detalle en `ANALISIS-OPTIMIZACION.md`.
