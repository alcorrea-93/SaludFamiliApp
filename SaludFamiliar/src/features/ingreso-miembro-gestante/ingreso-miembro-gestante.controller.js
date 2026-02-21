import * as useCases from './ingreso-miembro-gestante.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { miembro_ingreso_id } = req.body;
    if (!miembro_ingreso_id) return badRequest(res, 'miembro_ingreso_id es requerido');
    const row = await useCases.create(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res);
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getByMiembroIngresoId(req, res) {
  try {
    const row = await useCases.getByMiembroIngresoId(req.params.miembroIngresoId);
    if (!row) return notFound(res);
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res);
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.remove(req.params.id);
    if (!deleted) return notFound(res);
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
