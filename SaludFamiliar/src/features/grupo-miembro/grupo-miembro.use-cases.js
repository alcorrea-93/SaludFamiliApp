import * as repo from './grupo-miembro.repository.js';

export const create = (data) => repo.create(data);
export const getById = (id) => repo.findById(id);
export const list = (filters) => repo.findAll(filters);
export const listByGrupoPeriodo = (grupoId, periodoId) => repo.findByGrupoPeriodo(grupoId, periodoId);
export const update = (id, data) => repo.update(id, data);
export const remove = (id) => repo.remove(id);
