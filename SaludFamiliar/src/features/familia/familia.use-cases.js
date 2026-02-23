import * as repo from './familia.repository.js';

export async function createFamilia(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function getByCodigo(codigo) {
  return repo.findByCodigo(codigo);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function updateFamilia(id, data) {
  return repo.update(id, data);
}

export async function deleteFamilia(id) {
  return repo.remove(id);
}
