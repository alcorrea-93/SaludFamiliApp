import * as useCases from './asignacion-familia-grupo.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { periodo_id, grupo_id, familia_id } = req.body;
    if (!periodo_id || !grupo_id || !familia_id) {
      return badRequest(res, 'periodo_id, grupo_id y familia_id son requeridos');
    }
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Asignacion no encontrada');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function list(req, res) {
  try {
    const { periodo_id, grupo_id, familia_id } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    return ok(res, await useCases.list({ periodo_id, grupo_id, familia_id, page, limit }));
  } catch (err) { return handleError(res, err); }
}

export async function listByGrupoPeriodo(req, res) {
  try {
    const { grupoId, periodoId } = req.params;
    return ok(res, await useCases.listByGrupoPeriodo(grupoId, periodoId));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Asignacion no encontrada');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Asignacion no encontrada');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
