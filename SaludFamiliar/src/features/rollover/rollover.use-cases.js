import * as repo from './rollover.repository.js';

export const preview = (periodoOrigenId) => repo.preview(periodoOrigenId);
export const ejecutar = (periodoOrigenId, periodoDestinoId, grupoDestinoId) =>
  repo.ejecutarRollover(periodoOrigenId, periodoDestinoId, grupoDestinoId);
