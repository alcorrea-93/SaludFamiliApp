import * as useCases from './ingreso-vivienda.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { ingreso_id } = req.body;
    if (!ingreso_id) return badRequest(res, 'ingreso_id es requerido');
    const row = await useCases.createIngresoVivienda(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Ingreso vivienda no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getByIngresoId(req, res) {
  try {
    const row = await useCases.getByIngresoId(req.params.ingresoId);
    if (!row) return notFound(res, 'Ingreso vivienda no encontrado para este ingreso');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { ingreso_id } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const result = await useCases.list({ ingreso_id, page, limit });
    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateIngresoVivienda(req.params.id, req.body);
    if (!row) return notFound(res, 'Ingreso vivienda no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteIngresoVivienda(req.params.id);
    if (!deleted) return notFound(res, 'Ingreso vivienda no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
