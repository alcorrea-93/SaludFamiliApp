import * as useCases from './ingreso-familia-miembro.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { ingreso_id } = req.body;
    if (!ingreso_id) return badRequest(res, 'ingreso_id es requerido');
    const row = await useCases.createIngresoFamiliaMiembro(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Miembro no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { ingreso_id } = req.query;
    const rows = await useCases.list({ ingreso_id });
    return ok(res, rows);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateIngresoFamiliaMiembro(req.params.id, req.body);
    if (!row) return notFound(res, 'Miembro no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteIngresoFamiliaMiembro(req.params.id);
    if (!deleted) return notFound(res, 'Miembro no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
