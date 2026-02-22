import * as repo from './seguimiento.repository.js';

export const create = (data) => repo.create(data);
export const getById = (id) => repo.findById(id);
export const getCompleto = (id) => repo.findCompleto(id);
export const list = (filters) => repo.findAll(filters);
export const update = (id, data) => repo.update(id, data);
export const remove = (id) => repo.remove(id);
