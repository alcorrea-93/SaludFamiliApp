import * as useCases from './seguimiento-participante.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { seguimiento_id, estudiante_id } = req.body;
    if (!seguimiento_id || !estudiante_id) {
      return badRequest(res, 'seguimiento_id y estudiante_id son requeridos');
    }
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Participante no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function listBySeguimiento(req, res) {
  try {
    return ok(res, await useCases.listBySeguimiento(req.params.seguimientoId));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Participante no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Participante no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
