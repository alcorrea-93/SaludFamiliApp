import { Router } from 'express';
import * as ctrl from './profesor-asignado.controller.js';

export const profesorAsignadoRoutes = Router();

profesorAsignadoRoutes.get('/', ctrl.list);
profesorAsignadoRoutes.get('/:id', ctrl.getById);
profesorAsignadoRoutes.post('/', ctrl.create);
profesorAsignadoRoutes.put('/:id', ctrl.update);
profesorAsignadoRoutes.delete('/:id', ctrl.remove);
