import * as useCases from './estado-familia.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { codigo, nombre } = req.body;
    if (!codigo || !nombre) return badRequest(res, 'codigo y nombre son requeridos');
    return created(res, await useCases.create(req.body));
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Estado no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function list(_req, res) {
  try { return ok(res, await useCases.list()); }
  catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Estado no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Estado no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
