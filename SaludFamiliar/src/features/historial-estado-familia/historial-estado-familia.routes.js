import { Router } from 'express';
import * as ctrl from './historial-estado-familia.controller.js';

export const historialEstadoFamiliaRoutes = Router();

historialEstadoFamiliaRoutes.get('/por-familia/:familiaId', ctrl.listByFamilia);
historialEstadoFamiliaRoutes.get('/:id', ctrl.getById);
historialEstadoFamiliaRoutes.post('/', ctrl.create);
historialEstadoFamiliaRoutes.put('/:id', ctrl.update);
historialEstadoFamiliaRoutes.delete('/:id', ctrl.remove);
