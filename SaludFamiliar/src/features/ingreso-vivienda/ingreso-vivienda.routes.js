import { Router } from 'express';
import * as ctrl from './ingreso-vivienda.controller.js';

export const ingresoViviendaRoutes = Router();

ingresoViviendaRoutes.get('/', ctrl.list);
ingresoViviendaRoutes.get('/por-ingreso/:ingresoId', ctrl.getByIngresoId);
ingresoViviendaRoutes.get('/:id', ctrl.getById);
ingresoViviendaRoutes.post('/', ctrl.create);
ingresoViviendaRoutes.put('/:id', ctrl.update);
ingresoViviendaRoutes.patch('/:id', ctrl.update);
ingresoViviendaRoutes.delete('/:id', ctrl.remove);
