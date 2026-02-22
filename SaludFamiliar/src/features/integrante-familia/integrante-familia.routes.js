import { Router } from 'express';
import * as ctrl from './integrante-familia.controller.js';

export const integranteFamiliaRoutes = Router();

integranteFamiliaRoutes.get('/por-familia/:familiaId', ctrl.listByFamilia);
integranteFamiliaRoutes.get('/', ctrl.list);
integranteFamiliaRoutes.get('/:id', ctrl.getById);
integranteFamiliaRoutes.post('/', ctrl.create);
integranteFamiliaRoutes.put('/:id', ctrl.update);
integranteFamiliaRoutes.patch('/:id', ctrl.update);
integranteFamiliaRoutes.delete('/:id', ctrl.remove);
