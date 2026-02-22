import * as useCases from './integrante-familia.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { familia_id, nombres, apellidos } = req.body;
    if (!familia_id || !nombres || !apellidos) {
      return badRequest(res, 'familia_id, nombres y apellidos son requeridos');
    }
    const row = await useCases.createIntegrante(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Integrante no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { familia_id, activo } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const result = await useCases.list({ familia_id, activo, page, limit });
    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function listByFamilia(req, res) {
  try {
    const rows = await useCases.listByFamilia(req.params.familiaId);
    return ok(res, rows);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateIntegrante(req.params.id, req.body);
    if (!row) return notFound(res, 'Integrante no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteIntegrante(req.params.id);
    if (!deleted) return notFound(res, 'Integrante no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
