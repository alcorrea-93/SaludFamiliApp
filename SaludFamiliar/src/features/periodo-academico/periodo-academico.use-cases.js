import * as repo from './periodo-academico.repository.js';

export async function createPeriodo(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function getActivo() {
  return repo.findActivo();
}

export async function updatePeriodo(id, data) {
  return repo.update(id, data);
}

export async function deletePeriodo(id) {
  return repo.remove(id);
}
