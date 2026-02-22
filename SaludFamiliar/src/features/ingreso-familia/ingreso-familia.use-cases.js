import * as repo from './ingreso-familia.repository.js';

export async function createIngresoFamilia(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function getCompleto(id) {
  return repo.findCompleto(id);
}

export async function updateIngresoFamilia(id, data) {
  return repo.update(id, data);
}

export async function deleteIngresoFamilia(id) {
  return repo.remove(id);
}
