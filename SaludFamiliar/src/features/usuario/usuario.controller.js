import * as useCases from './usuario.use-cases.js';
import { created, ok, noContent, notFound, badRequest, handleError } from '../../shared/http.js';

export async function create(req, res) {
  try {
    const { nombre_completo, correo, password, rol_id } = req.body;
    if (!nombre_completo || !correo || !password || !rol_id) {
      return badRequest(res, 'nombre_completo, correo, password y rol_id son requeridos');
    }
    const row = await useCases.create(req.body);
    return created(res, { id: row.id, nombre_completo: row.nombre_completo, correo: row.correo });
  } catch (err) { return handleError(res, err); }
}

export async function getById(req, res) {
  try {
    const row = await useCases.getById(req.params.id);
    if (!row) return notFound(res, 'Usuario no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function list(req, res) {
  try {
    const { activo, rol_id } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    return ok(res, await useCases.list({ activo, rol_id, page, limit }));
  } catch (err) { return handleError(res, err); }
}

export async function update(req, res) {
  try {
    const row = await useCases.update(req.params.id, req.body);
    if (!row) return notFound(res, 'Usuario no encontrado');
    return ok(res, row);
  } catch (err) { return handleError(res, err); }
}

export async function resetPassword(req, res) {
  try {
    const { new_password } = req.body;
    if (!new_password) return badRequest(res, 'new_password es requerido');
    const result = await useCases.resetPassword(req.params.id, new_password);
    if (!result) return notFound(res, 'Usuario no encontrado');
    return ok(res, { message: 'Contraseña actualizada' });
  } catch (err) { return handleError(res, err); }
}

export async function remove(req, res) {
  try {
    if (!await useCases.remove(req.params.id)) return notFound(res, 'Usuario no encontrado');
    return noContent(res);
  } catch (err) { return handleError(res, err); }
}
