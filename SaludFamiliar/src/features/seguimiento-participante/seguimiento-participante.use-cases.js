import * as repo from './seguimiento-participante.repository.js';

export const create = (data) => repo.create(data);
export const getById = (id) => repo.findById(id);
export const listBySeguimiento = (seguimientoId) => repo.findBySeguimientoId(seguimientoId);
export const update = (id, data) => repo.update(id, data);
export const remove = (id) => repo.remove(id);
