import * as useCases from './grupo-estudiantil.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) return badRequest(res, 'nombre es requerido');
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Grupo no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function list(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    return ok(res, await useCases.list({ page, limit }));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Grupo no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Grupo no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
