import * as useCases from './vereda.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { territorio_id, nombre } = req.body;
    if (!territorio_id || !nombre) return badRequest(res, 'territorio_id y nombre son requeridos');
    const row = await useCases.createVereda(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Vereda no encontrada');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { territorio_id, activa } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const result = await useCases.list({ territorio_id, activa, page, limit });
    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateVereda(req.params.id, req.body);
    if (!row) return notFound(res, 'Vereda no encontrada');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteVereda(req.params.id);
    if (!deleted) return notFound(res, 'Vereda no encontrada');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
