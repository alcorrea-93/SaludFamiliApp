import { Router } from 'express';
import * as ctrl from './profesor.controller.js';

export const profesorRoutes = Router();

profesorRoutes.get('/', ctrl.list);
profesorRoutes.get('/:id', ctrl.getById);
profesorRoutes.post('/', ctrl.create);
profesorRoutes.put('/:id', ctrl.update);
profesorRoutes.patch('/:id', ctrl.update);
profesorRoutes.delete('/:id', ctrl.remove);
