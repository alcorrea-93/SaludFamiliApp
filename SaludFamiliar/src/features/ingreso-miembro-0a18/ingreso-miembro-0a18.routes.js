import { Router } from 'express';
import * as ctrl from './ingreso-miembro-0a18.controller.js';

export const ingresoMiembro0a18Routes = Router();

ingresoMiembro0a18Routes.get('/por-miembro/:miembroIngresoId', ctrl.getByMiembroIngresoId);
ingresoMiembro0a18Routes.get('/:id', ctrl.getById);
ingresoMiembro0a18Routes.post('/', ctrl.create);
ingresoMiembro0a18Routes.put('/:id', ctrl.update);
ingresoMiembro0a18Routes.patch('/:id', ctrl.update);
ingresoMiembro0a18Routes.delete('/:id', ctrl.remove);
