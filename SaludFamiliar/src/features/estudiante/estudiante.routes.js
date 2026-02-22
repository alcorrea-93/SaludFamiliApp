import { Router } from 'express';
import * as ctrl from './estudiante.controller.js';

export const estudianteRoutes = Router();

estudianteRoutes.get('/', ctrl.list);
estudianteRoutes.get('/:id', ctrl.getById);
estudianteRoutes.post('/', ctrl.create);
estudianteRoutes.put('/:id', ctrl.update);
estudianteRoutes.patch('/:id', ctrl.update);
estudianteRoutes.delete('/:id', ctrl.remove);
