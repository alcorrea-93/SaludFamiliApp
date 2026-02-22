import * as useCases from './familia.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { vereda_id, nombre_familia } = req.body;
    if (!vereda_id || !nombre_familia) return badRequest(res, 'vereda_id y nombre_familia son requeridos');
    const row = await useCases.createFamilia(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Familia no encontrada');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { vereda_id, q } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const result = await useCases.list({ vereda_id, q, page, limit });
    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateFamilia(req.params.id, req.body);
    if (!row) return notFound(res, 'Familia no encontrada');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteFamilia(req.params.id);
    if (!deleted) return notFound(res, 'Familia no encontrada');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
