import * as repo from './reportes.repository.js';

export const resumenIngresos = (filters) => repo.resumenIngresos(filters);
export const conteoIngresosPorPeriodo = () => repo.conteoIngresosPorPeriodo();
export const conteoIngresosPorTerritorio = (filters) => repo.conteoIngresosPorTerritorio(filters);
export const resumenSeguimientos = (filters) => repo.resumenSeguimientos(filters);
export const familiasSinSeguimiento = (filters) => repo.familiasSinSeguimiento(filters);
export const resumenAcademico = (filters) => repo.resumenAcademico(filters);
