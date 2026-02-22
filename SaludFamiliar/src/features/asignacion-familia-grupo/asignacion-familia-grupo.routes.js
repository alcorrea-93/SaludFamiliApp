import { Router } from 'express';
import * as ctrl from './asignacion-familia-grupo.controller.js';

export const asignacionFamiliaGrupoRoutes = Router();

asignacionFamiliaGrupoRoutes.get('/grupo/:grupoId/periodo/:periodoId', ctrl.listByGrupoPeriodo);
asignacionFamiliaGrupoRoutes.get('/', ctrl.list);
asignacionFamiliaGrupoRoutes.get('/:id', ctrl.getById);
asignacionFamiliaGrupoRoutes.post('/', ctrl.create);
asignacionFamiliaGrupoRoutes.put('/:id', ctrl.update);
asignacionFamiliaGrupoRoutes.patch('/:id', ctrl.update);
asignacionFamiliaGrupoRoutes.delete('/:id', ctrl.remove);
