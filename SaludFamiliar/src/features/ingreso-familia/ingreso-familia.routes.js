import { Router } from 'express';
import * as ctrl from './ingreso-familia.controller.js';

export const ingresoFamiliaRoutes = Router();

ingresoFamiliaRoutes.get('/', ctrl.list);
ingresoFamiliaRoutes.get('/:id/completo', ctrl.getCompleto);
ingresoFamiliaRoutes.get('/:id', ctrl.getById);
ingresoFamiliaRoutes.post('/', ctrl.create);
ingresoFamiliaRoutes.put('/:id', ctrl.update);
ingresoFamiliaRoutes.patch('/:id', ctrl.update);
ingresoFamiliaRoutes.delete('/:id', ctrl.remove);
