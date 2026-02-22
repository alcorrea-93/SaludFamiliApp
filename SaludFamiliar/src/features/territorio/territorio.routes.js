import { Router } from 'express';
import * as ctrl from './territorio.controller.js';

export const territorioRoutes = Router();

territorioRoutes.get('/', ctrl.list);
territorioRoutes.get('/:id', ctrl.getById);
territorioRoutes.post('/', ctrl.create);
territorioRoutes.put('/:id', ctrl.update);
territorioRoutes.patch('/:id', ctrl.update);
territorioRoutes.delete('/:id', ctrl.remove);
