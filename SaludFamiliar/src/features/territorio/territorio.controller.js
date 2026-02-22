import * as useCases from './territorio.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) return badRequest(res, 'nombre es requerido');
    const row = await useCases.createTerritorio(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Territorio no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { activo } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const result = await useCases.list({ activo, page, limit });
    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateTerritorio(req.params.id, req.body);
    if (!row) return notFound(res, 'Territorio no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteTerritorio(req.params.id);
    if (!deleted) return notFound(res, 'Territorio no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
