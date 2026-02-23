import { Router } from 'express';
import * as ctrl from './rollover.controller.js';
import { authMiddleware, requireRole } from '../../shared/auth.js';

export const rolloverRoutes = Router();

rolloverRoutes.use(authMiddleware);
rolloverRoutes.use(requireRole('ADMIN', 'JEFE_MATERIA'));

rolloverRoutes.get('/preview', ctrl.preview);
rolloverRoutes.post('/ejecutar', ctrl.ejecutar);
