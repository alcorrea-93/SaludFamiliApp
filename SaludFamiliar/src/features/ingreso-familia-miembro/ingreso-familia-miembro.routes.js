import { Router } from 'express';
import * as ctrl from './ingreso-familia-miembro.controller.js';

export const ingresoFamiliaMiembroRoutes = Router();

ingresoFamiliaMiembroRoutes.get('/', ctrl.list);
ingresoFamiliaMiembroRoutes.get('/:id', ctrl.getById);
ingresoFamiliaMiembroRoutes.post('/', ctrl.create);
ingresoFamiliaMiembroRoutes.put('/:id', ctrl.update);
ingresoFamiliaMiembroRoutes.patch('/:id', ctrl.update);
ingresoFamiliaMiembroRoutes.delete('/:id', ctrl.remove);
