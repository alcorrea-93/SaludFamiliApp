# Migraciones SQL

Cuando tengas PostgreSQL creado (local o nube):

1. Crea la base de datos: `CREATE DATABASE salud_familiar;`
2. Configura `DATABASE_URL` en tu `.env`
3. Ejecuta los scripts en orden:

```bash
psql -U postgres -d salud_familiar -f 001_tablas_base.sql
psql -U postgres -d salud_familiar -f 002_ingreso_familia.sql
psql -U postgres -d salud_familiar -f 003_ingreso_vivienda.sql
psql -U postgres -d salud_familiar -f 004_ingreso_familia_miembro.sql
psql -U postgres -d salud_familiar -f 005_ingreso_miembro_por_edad.sql
```

O desde un cliente gráfico (DBeaver, pgAdmin): abre y ejecuta cada archivo en orden.
