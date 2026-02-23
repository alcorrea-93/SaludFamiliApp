import * as useCases from './rollover.use-cases.js';
import { ok, badRequest, handleError } from '../../shared/http.js';

export async function preview(req, res) {
  try {
    const { periodo_origen_id } = req.query;
    if (!periodo_origen_id) return badRequest(res, 'periodo_origen_id es requerido');
    return ok(res, await useCases.preview(periodo_origen_id));
  } catch (err) { return handleError(res, err); }
}

export async function ejecutar(req, res) {
  try {
    const { periodo_origen_id, periodo_destino_id, grupo_destino_id } = req.body;
    if (!periodo_origen_id || !periodo_destino_id) {
      return badRequest(res, 'periodo_origen_id y periodo_destino_id son requeridos');
    }
    const result = await useCases.ejecutar(periodo_origen_id, periodo_destino_id, grupo_destino_id);
    return ok(res, result);
  } catch (err) { return handleError(res, err); }
}
