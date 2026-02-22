import { Router } from 'express';
import * as ctrl from './familia-perdida-registro.controller.js';

export const familiaPerdidaRegistroRoutes = Router();

familiaPerdidaRegistroRoutes.get('/', ctrl.list);
familiaPerdidaRegistroRoutes.get('/:id', ctrl.getById);
familiaPerdidaRegistroRoutes.post('/', ctrl.create);
familiaPerdidaRegistroRoutes.put('/:id', ctrl.update);
familiaPerdidaRegistroRoutes.delete('/:id', ctrl.remove);
