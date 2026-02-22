import { Router } from 'express';
import * as ctrl from './grupo-estudiantil.controller.js';

export const grupoEstudiantilRoutes = Router();

grupoEstudiantilRoutes.get('/', ctrl.list);
grupoEstudiantilRoutes.get('/:id', ctrl.getById);
grupoEstudiantilRoutes.post('/', ctrl.create);
grupoEstudiantilRoutes.put('/:id', ctrl.update);
grupoEstudiantilRoutes.patch('/:id', ctrl.update);
grupoEstudiantilRoutes.delete('/:id', ctrl.remove);
