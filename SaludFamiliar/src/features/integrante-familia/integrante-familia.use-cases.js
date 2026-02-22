import * as repo from './integrante-familia.repository.js';

export async function createIntegrante(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function listByFamilia(familiaId) {
  return repo.findByFamiliaId(familiaId);
}

export async function updateIntegrante(id, data) {
  return repo.update(id, data);
}

export async function deleteIntegrante(id) {
  return repo.remove(id);
}
