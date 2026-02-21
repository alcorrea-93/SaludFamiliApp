import { Router } from 'express';
import * as ctrl from './ingreso-miembro-19a44.controller.js';

export const ingresoMiembro19a44Routes = Router();

ingresoMiembro19a44Routes.get('/por-miembro/:miembroIngresoId', ctrl.getByMiembroIngresoId);
ingresoMiembro19a44Routes.get('/:id', ctrl.getById);
ingresoMiembro19a44Routes.post('/', ctrl.create);
ingresoMiembro19a44Routes.put('/:id', ctrl.update);
ingresoMiembro19a44Routes.patch('/:id', ctrl.update);
ingresoMiembro19a44Routes.delete('/:id', ctrl.remove);
