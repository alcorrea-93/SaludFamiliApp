import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/salud_familiar';

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
  },
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err.message);
    console.log('Asegúrate de crear la BD y ejecutar las migraciones en /migrations');
    throw err;
  }
}
