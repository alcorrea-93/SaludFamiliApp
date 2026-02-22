import { Router } from 'express';
import * as ctrl from './estado-familia.controller.js';

export const estadoFamiliaRoutes = Router();

estadoFamiliaRoutes.get('/', ctrl.list);
estadoFamiliaRoutes.get('/:id', ctrl.getById);
estadoFamiliaRoutes.post('/', ctrl.create);
estadoFamiliaRoutes.put('/:id', ctrl.update);
estadoFamiliaRoutes.delete('/:id', ctrl.remove);
