import * as repo from './historial-estado-familia.repository.js';

export const create = (data) => repo.create(data);
export const getById = (id) => repo.findById(id);
export const listByFamilia = (familiaId) => repo.findByFamiliaId(familiaId);
export const update = (id, data) => repo.update(id, data);
export const remove = (id) => repo.remove(id);
