import * as useCases from './historial-estado-familia.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { familia_id, estado_id, fecha_desde } = req.body;
    if (!familia_id || !estado_id || !fecha_desde) {
      return badRequest(res, 'familia_id, estado_id y fecha_desde son requeridos');
    }
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Historial no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function listByFamilia(req, res) {
  try {
    return ok(res, await useCases.listByFamilia(req.params.familiaId));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Historial no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Historial no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
