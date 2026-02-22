import { Router } from 'express';
import * as ctrl from './vereda.controller.js';

export const veredaRoutes = Router();

veredaRoutes.get('/', ctrl.list);
veredaRoutes.get('/:id', ctrl.getById);
veredaRoutes.post('/', ctrl.create);
veredaRoutes.put('/:id', ctrl.update);
veredaRoutes.patch('/:id', ctrl.update);
veredaRoutes.delete('/:id', ctrl.remove);
