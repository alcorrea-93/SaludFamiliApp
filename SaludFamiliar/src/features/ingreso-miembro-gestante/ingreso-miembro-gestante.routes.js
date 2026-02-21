import { Router } from 'express';
import * as ctrl from './ingreso-miembro-gestante.controller.js';

export const ingresoMiembroGestanteRoutes = Router();

ingresoMiembroGestanteRoutes.get('/por-miembro/:miembroIngresoId', ctrl.getByMiembroIngresoId);
ingresoMiembroGestanteRoutes.get('/:id', ctrl.getById);
ingresoMiembroGestanteRoutes.post('/', ctrl.create);
ingresoMiembroGestanteRoutes.put('/:id', ctrl.update);
ingresoMiembroGestanteRoutes.patch('/:id', ctrl.update);
ingresoMiembroGestanteRoutes.delete('/:id', ctrl.remove);
