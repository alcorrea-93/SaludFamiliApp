import express from 'express';
import cors from 'cors';
import { notFoundHandler, globalErrorHandler } from './shared/error-middleware.js';
import { territorioRoutes } from './features/territorio/territorio.routes.js';
import { veredaRoutes } from './features/vereda/vereda.routes.js';
import { familiaRoutes } from './features/familia/familia.routes.js';
import { periodoAcademicoRoutes } from './features/periodo-academico/periodo-academico.routes.js';
import { ingresoFamiliaRoutes } from './features/ingreso-familia/ingreso-familia.routes.js';
import { ingresoViviendaRoutes } from './features/ingreso-vivienda/ingreso-vivienda.routes.js';
import { ingresoViviendaAnimalRoutes } from './features/ingreso-vivienda-animal/ingreso-vivienda-animal.routes.js';
import { ingresoFamiliaMiembroRoutes } from './features/ingreso-familia-miembro/ingreso-familia-miembro.routes.js';
import { ingresoMiembro0a18Routes } from './features/ingreso-miembro-0a18/ingreso-miembro-0a18.routes.js';
import { ingresoMiembro19a44Routes } from './features/ingreso-miembro-19a44/ingreso-miembro-19a44.routes.js';
import { ingresoMiembro45MasRoutes } from './features/ingreso-miembro-45mas/ingreso-miembro-45mas.routes.js';
import { ingresoMiembroGestanteRoutes } from './features/ingreso-miembro-gestante/ingreso-miembro-gestante.routes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/territorios', territorioRoutes);
app.use('/api/veredas', veredaRoutes);
app.use('/api/familias', familiaRoutes);
app.use('/api/periodos-academicos', periodoAcademicoRoutes);
app.use('/api/ingreso-familia', ingresoFamiliaRoutes);
app.use('/api/ingreso-vivienda', ingresoViviendaRoutes);
app.use('/api/ingreso-vivienda-animal', ingresoViviendaAnimalRoutes);
app.use('/api/ingreso-familia-miembro', ingresoFamiliaMiembroRoutes);
app.use('/api/ingreso-miembro-0a18', ingresoMiembro0a18Routes);
app.use('/api/ingreso-miembro-19a44', ingresoMiembro19a44Routes);
app.use('/api/ingreso-miembro-45mas', ingresoMiembro45MasRoutes);
app.use('/api/ingreso-miembro-gestante', ingresoMiembroGestanteRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
