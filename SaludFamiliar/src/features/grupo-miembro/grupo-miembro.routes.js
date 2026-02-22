import { Router } from 'express';
import * as ctrl from './grupo-miembro.controller.js';

export const grupoMiembroRoutes = Router();

grupoMiembroRoutes.get('/grupo/:grupoId/periodo/:periodoId', ctrl.listByGrupoPeriodo);
grupoMiembroRoutes.get('/', ctrl.list);
grupoMiembroRoutes.get('/:id', ctrl.getById);
grupoMiembroRoutes.post('/', ctrl.create);
grupoMiembroRoutes.put('/:id', ctrl.update);
grupoMiembroRoutes.patch('/:id', ctrl.update);
grupoMiembroRoutes.delete('/:id', ctrl.remove);
