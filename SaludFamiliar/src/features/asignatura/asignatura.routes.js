import { Router } from 'express';
import * as ctrl from './asignatura.controller.js';

export const asignaturaRoutes = Router();

asignaturaRoutes.get('/', ctrl.list);
asignaturaRoutes.get('/:id', ctrl.getById);
asignaturaRoutes.post('/', ctrl.create);
asignaturaRoutes.put('/:id', ctrl.update);
asignaturaRoutes.delete('/:id', ctrl.remove);
