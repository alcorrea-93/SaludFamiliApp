import * as repo from './territorio.repository.js';

export async function createTerritorio(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function updateTerritorio(id, data) {
  return repo.update(id, data);
}

export async function deleteTerritorio(id) {
  return repo.remove(id);
}
