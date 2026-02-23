import { Router } from 'express';
import * as ctrl from './reportes.controller.js';
import { authMiddleware, requireRole } from '../../shared/auth.js';

export const reportesRoutes = Router();

reportesRoutes.use(authMiddleware);
reportesRoutes.use(requireRole('ADMIN', 'JEFE_MATERIA', 'DOCENTE'));

reportesRoutes.get('/ingresos/resumen', ctrl.resumenIngresos);
reportesRoutes.get('/ingresos/por-periodo', ctrl.conteoIngresosPorPeriodo);
reportesRoutes.get('/ingresos/por-territorio', ctrl.conteoIngresosPorTerritorio);
reportesRoutes.get('/seguimientos/resumen', ctrl.resumenSeguimientos);
reportesRoutes.get('/seguimientos/familias-sin-seguimiento', ctrl.familiasSinSeguimiento);
reportesRoutes.get('/academico/resumen', ctrl.resumenAcademico);
