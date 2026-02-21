import * as useCases from './ingreso-vivienda-animal.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { ingreso_vivienda_id, tipo } = req.body;
    if (!ingreso_vivienda_id || !tipo) return badRequest(res, 'ingreso_vivienda_id y tipo son requeridos');
    const row = await useCases.createIngresoViviendaAnimal(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Registro no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function listByViviendaId(req, res) {
  try {
    const rows = await useCases.listByViviendaId(req.params.viviendaId);
    return ok(res, rows);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateIngresoViviendaAnimal(req.params.id, req.body);
    if (!row) return notFound(res, 'Registro no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteIngresoViviendaAnimal(req.params.id);
    if (!deleted) return notFound(res, 'Registro no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
