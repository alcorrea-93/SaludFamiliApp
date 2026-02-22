import * as repo from './vereda.repository.js';

export async function createVereda(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function updateVereda(id, data) {
  return repo.update(id, data);
}

export async function deleteVereda(id) {
  return repo.remove(id);
}
