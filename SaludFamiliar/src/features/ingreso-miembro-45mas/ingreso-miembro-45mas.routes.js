import { Router } from 'express';
import * as ctrl from './ingreso-miembro-45mas.controller.js';

export const ingresoMiembro45MasRoutes = Router();

ingresoMiembro45MasRoutes.get('/por-miembro/:miembroIngresoId', ctrl.getByMiembroIngresoId);
ingresoMiembro45MasRoutes.get('/:id', ctrl.getById);
ingresoMiembro45MasRoutes.post('/', ctrl.create);
ingresoMiembro45MasRoutes.put('/:id', ctrl.update);
ingresoMiembro45MasRoutes.patch('/:id', ctrl.update);
ingresoMiembro45MasRoutes.delete('/:id', ctrl.remove);
