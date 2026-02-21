import { Router } from 'express';
import * as ctrl from './ingreso-vivienda-animal.controller.js';

export const ingresoViviendaAnimalRoutes = Router();

ingresoViviendaAnimalRoutes.get('/por-vivienda/:viviendaId', ctrl.listByViviendaId);
ingresoViviendaAnimalRoutes.get('/:id', ctrl.getById);
ingresoViviendaAnimalRoutes.post('/', ctrl.create);
ingresoViviendaAnimalRoutes.put('/:id', ctrl.update);
ingresoViviendaAnimalRoutes.patch('/:id', ctrl.update);
ingresoViviendaAnimalRoutes.delete('/:id', ctrl.remove);
