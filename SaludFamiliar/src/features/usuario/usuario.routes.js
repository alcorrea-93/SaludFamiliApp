import { Router } from 'express';
import * as ctrl from './usuario.controller.js';
import { authMiddleware, requireRole } from '../../shared/auth.js';

export const usuarioRoutes = Router();

usuarioRoutes.use(authMiddleware);
usuarioRoutes.use(requireRole('ADMIN'));

usuarioRoutes.get('/', ctrl.list);
usuarioRoutes.get('/:id', ctrl.getById);
usuarioRoutes.post('/', ctrl.create);
usuarioRoutes.put('/:id', ctrl.update);
usuarioRoutes.patch('/:id/reset-password', ctrl.resetPassword);
usuarioRoutes.delete('/:id', ctrl.remove);
