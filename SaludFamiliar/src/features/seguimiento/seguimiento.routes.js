import { Router } from 'express';
import * as ctrl from './seguimiento.controller.js';

export const seguimientoRoutes = Router();

seguimientoRoutes.get('/', ctrl.list);
seguimientoRoutes.get('/:id/completo', ctrl.getCompleto);
seguimientoRoutes.get('/:id', ctrl.getById);
seguimientoRoutes.post('/', ctrl.create);
seguimientoRoutes.put('/:id', ctrl.update);
seguimientoRoutes.patch('/:id', ctrl.update);
seguimientoRoutes.delete('/:id', ctrl.remove);
