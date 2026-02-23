import * as useCases from './auth.use-cases.js';
import { ok, badRequest, handleError } from '../../shared/http.js';

export async function login(req, res) {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) return badRequest(res, 'correo y password son requeridos');

    const result = await useCases.login(correo, password);
    if (result.error) return res.status(401).json({ error: result.error });

    return ok(res, result);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function me(req, res) {
  return ok(res, req.user);
}
