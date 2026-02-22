import { Router } from 'express';
import * as ctrl from './seguimiento-participante.controller.js';

export const seguimientoParticipanteRoutes = Router();

seguimientoParticipanteRoutes.get('/por-seguimiento/:seguimientoId', ctrl.listBySeguimiento);
seguimientoParticipanteRoutes.get('/:id', ctrl.getById);
seguimientoParticipanteRoutes.post('/', ctrl.create);
seguimientoParticipanteRoutes.put('/:id', ctrl.update);
seguimientoParticipanteRoutes.patch('/:id', ctrl.update);
seguimientoParticipanteRoutes.delete('/:id', ctrl.remove);
