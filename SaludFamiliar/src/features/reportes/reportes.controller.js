import * as useCases from './reportes.use-cases.js';
import { ok, handleError } from '../../shared/http.js';

export async function resumenIngresos(req, res) {
  try {
    const { anio, semestre, territorio_id, vereda_id } = req.query;
    return ok(res, await useCases.resumenIngresos({ anio, semestre, territorio_id, vereda_id }));
  } catch (err) { return handleError(res, err); }
}

export async function conteoIngresosPorPeriodo(_req, res) {
  try {
    return ok(res, await useCases.conteoIngresosPorPeriodo());
  } catch (err) { return handleError(res, err); }
}

export async function conteoIngresosPorTerritorio(req, res) {
  try {
    const { anio, semestre } = req.query;
    return ok(res, await useCases.conteoIngresosPorTerritorio({ anio, semestre }));
  } catch (err) { return handleError(res, err); }
}

export async function resumenSeguimientos(req, res) {
  try {
    const { anio, semestre, territorio_id, grupo_id, profesor_id } = req.query;
    return ok(res, await useCases.resumenSeguimientos({ anio, semestre, territorio_id, grupo_id, profesor_id }));
  } catch (err) { return handleError(res, err); }
}

export async function familiasSinSeguimiento(req, res) {
  try {
    const { periodo_id } = req.query;
    return ok(res, await useCases.familiasSinSeguimiento({ periodo_id }));
  } catch (err) { return handleError(res, err); }
}

export async function resumenAcademico(req, res) {
  try {
    const { periodo_id } = req.query;
    return ok(res, await useCases.resumenAcademico({ periodo_id }));
  } catch (err) { return handleError(res, err); }
}
