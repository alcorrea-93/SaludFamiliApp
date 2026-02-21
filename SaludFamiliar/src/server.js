import './models/index.js';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar:', err);
    process.exit(1);
  }
}

start();
