import * as repo from './usuario.repository.js';

export const create = (data) => repo.create(data);
export const getById = (id) => repo.findById(id);
export const list = (filters) => repo.findAll(filters);
export const update = (id, data) => repo.update(id, data);
export const resetPassword = (id, newPassword) => repo.resetPassword(id, newPassword);
export const remove = (id) => repo.remove(id);
