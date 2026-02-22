import * as useCases from './familia-perdida-registro.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { historial_estado_id, familia_id, fecha_registro, territorio, nombre_familia, causa } = req.body;
    if (!historial_estado_id || !familia_id || !fecha_registro || !territorio || !nombre_familia || !causa) {
      return badRequest(res, 'historial_estado_id, familia_id, fecha_registro, territorio, nombre_familia y causa son requeridos');
    }
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Registro no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function list(req, res) {
  try {
    const { familia_id, periodo_id } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    return ok(res, await useCases.list({ familia_id, periodo_id, page, limit }));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Registro no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Registro no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
