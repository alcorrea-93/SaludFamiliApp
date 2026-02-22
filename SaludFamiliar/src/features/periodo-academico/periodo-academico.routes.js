import { Router } from 'express';
import * as ctrl from './periodo-academico.controller.js';

export const periodoAcademicoRoutes = Router();

periodoAcademicoRoutes.get('/activo', ctrl.getActivo);
periodoAcademicoRoutes.get('/', ctrl.list);
periodoAcademicoRoutes.get('/:id', ctrl.getById);
periodoAcademicoRoutes.post('/', ctrl.create);
periodoAcademicoRoutes.put('/:id', ctrl.update);
periodoAcademicoRoutes.patch('/:id', ctrl.update);
periodoAcademicoRoutes.delete('/:id', ctrl.remove);
