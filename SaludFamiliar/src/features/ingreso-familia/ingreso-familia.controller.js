import * as useCases from './ingreso-familia.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { familia_id, periodo_id, fecha_ingreso, observaciones_docente, aspectos_trabajados, temas_a_trabajar } = req.body;
    if (!familia_id || !periodo_id || !fecha_ingreso) {
      return badRequest(res, 'familia_id, periodo_id y fecha_ingreso son requeridos');
    }
    const row = await useCases.createIngresoFamilia(req.body);
    return created(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Ingreso familia no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function list(req, res) {
  try {
    const { periodo_id, familia_id } = req.query;
    const rows = await useCases.list({ periodo_id, familia_id });
    return ok(res, rows);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req, res) {
  try {
    const row = await useCases.updateIngresoFamilia(req.params.id, req.body);
    if (!row) return notFound(res, 'Ingreso familia no encontrado');
    return ok(res, row);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req, res) {
  try {
    const deleted = await useCases.deleteIngresoFamilia(req.params.id);
    if (!deleted) return notFound(res, 'Ingreso familia no encontrado');
    return noContent(res);
  } catch (err) {
    return handleError(res, err);
  }
}
