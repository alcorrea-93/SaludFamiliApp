import { Router } from 'express';
import * as ctrl from './familia.controller.js';

export const familiaRoutes = Router();

familiaRoutes.get('/', ctrl.list);
familiaRoutes.get('/codigo/:codigo', ctrl.getByCodigo);
familiaRoutes.get('/:id', ctrl.getById);
familiaRoutes.post('/', ctrl.create);
familiaRoutes.put('/:id', ctrl.update);
familiaRoutes.patch('/:id', ctrl.update);
familiaRoutes.delete('/:id', ctrl.remove);
