import express from 'express';
import cors from 'cors';
import { notFoundHandler, globalErrorHandler } from './shared/error-middleware.js';
import { authMiddleware, requireRole } from './shared/auth.js';

/* --- Auth (público) --- */
import { authRoutes } from './features/auth/auth.routes.js';

/* --- Admin (protegido ADMIN) --- */
import { usuarioRoutes } from './features/usuario/usuario.routes.js';

/* --- Reportes (protegido, rol definido en sus rutas) --- */
import { reportesRoutes } from './features/reportes/reportes.routes.js';

/* --- Rollover (protegido, rol definido en sus rutas) --- */
import { rolloverRoutes } from './features/rollover/rollover.routes.js';

/* --- Catálogos territoriales --- */
import { territorioRoutes } from './features/territorio/territorio.routes.js';
import { veredaRoutes } from './features/vereda/vereda.routes.js';

/* --- Familias --- */
import { familiaRoutes } from './features/familia/familia.routes.js';
import { integranteFamiliaRoutes } from './features/integrante-familia/integrante-familia.routes.js';
import { estadoFamiliaRoutes } from './features/estado-familia/estado-familia.routes.js';
import { historialEstadoFamiliaRoutes } from './features/historial-estado-familia/historial-estado-familia.routes.js';

/* --- Periodos --- */
import { periodoAcademicoRoutes } from './features/periodo-academico/periodo-academico.routes.js';

/* --- Académicos --- */
import { profesorRoutes } from './features/profesor/profesor.routes.js';
import { estudianteRoutes } from './features/estudiante/estudiante.routes.js';
import { asignaturaRoutes } from './features/asignatura/asignatura.routes.js';
import { grupoEstudiantilRoutes } from './features/grupo-estudiantil/grupo-estudiantil.routes.js';
import { profesorAsignadoRoutes } from './features/profesor-asignado/profesor-asignado.routes.js';
import { grupoMiembroRoutes } from './features/grupo-miembro/grupo-miembro.routes.js';
import { asignacionFamiliaGrupoRoutes } from './features/asignacion-familia-grupo/asignacion-familia-grupo.routes.js';

/* --- Ingreso --- */
import { ingresoFamiliaRoutes } from './features/ingreso-familia/ingreso-familia.routes.js';
import { ingresoViviendaRoutes } from './features/ingreso-vivienda/ingreso-vivienda.routes.js';
import { ingresoViviendaAnimalRoutes } from './features/ingreso-vivienda-animal/ingreso-vivienda-animal.routes.js';
import { ingresoFamiliaMiembroRoutes } from './features/ingreso-familia-miembro/ingreso-familia-miembro.routes.js';
import { ingresoMiembro0a18Routes } from './features/ingreso-miembro-0a18/ingreso-miembro-0a18.routes.js';
import { ingresoMiembro19a44Routes } from './features/ingreso-miembro-19a44/ingreso-miembro-19a44.routes.js';
import { ingresoMiembro45MasRoutes } from './features/ingreso-miembro-45mas/ingreso-miembro-45mas.routes.js';
import { ingresoMiembroGestanteRoutes } from './features/ingreso-miembro-gestante/ingreso-miembro-gestante.routes.js';

/* --- Seguimiento --- */
import { seguimientoRoutes } from './features/seguimiento/seguimiento.routes.js';
import { seguimientoParticipanteRoutes } from './features/seguimiento-participante/seguimiento-participante.routes.js';
import { familiaPerdidaRegistroRoutes } from './features/familia-perdida-registro/familia-perdida-registro.routes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

/* === Públicos === */
app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);

/* === Protegidos (requieren login) === */
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/rollover', rolloverRoutes);

/* Todas las rutas de datos requieren autenticación */
app.use('/api', authMiddleware);

/* --- Catálogos --- */
app.use('/api/territorios', territorioRoutes);
app.use('/api/veredas', veredaRoutes);

/* --- Familias --- */
app.use('/api/familias', familiaRoutes);
app.use('/api/integrantes-familia', integranteFamiliaRoutes);
app.use('/api/estados-familia', estadoFamiliaRoutes);
app.use('/api/historial-estado-familia', historialEstadoFamiliaRoutes);

/* --- Periodos --- */
app.use('/api/periodos-academicos', periodoAcademicoRoutes);

/* --- Académicos --- */
app.use('/api/profesores', profesorRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/asignaturas', asignaturaRoutes);
app.use('/api/grupos-estudiantiles', grupoEstudiantilRoutes);
app.use('/api/profesores-asignados', profesorAsignadoRoutes);
app.use('/api/grupo-miembros', grupoMiembroRoutes);
app.use('/api/asignacion-familia-grupo', asignacionFamiliaGrupoRoutes);

/* --- Ingreso (DOCENTE+) --- */
app.use('/api/ingreso-familia', ingresoFamiliaRoutes);
app.use('/api/ingreso-vivienda', ingresoViviendaRoutes);
app.use('/api/ingreso-vivienda-animal', ingresoViviendaAnimalRoutes);
app.use('/api/ingreso-familia-miembro', ingresoFamiliaMiembroRoutes);
app.use('/api/ingreso-miembro-0a18', ingresoMiembro0a18Routes);
app.use('/api/ingreso-miembro-19a44', ingresoMiembro19a44Routes);
app.use('/api/ingreso-miembro-45mas', ingresoMiembro45MasRoutes);
app.use('/api/ingreso-miembro-gestante', ingresoMiembroGestanteRoutes);

/* --- Seguimiento --- */
app.use('/api/seguimientos', seguimientoRoutes);
app.use('/api/seguimiento-participantes', seguimientoParticipanteRoutes);
app.use('/api/familias-perdidas', familiaPerdidaRegistroRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
