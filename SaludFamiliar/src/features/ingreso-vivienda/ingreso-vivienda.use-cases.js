import * as repo from './ingreso-vivienda.repository.js';

export async function createIngresoVivienda(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function getByIngresoId(ingresoId) {
  return repo.findByIngresoId(ingresoId);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function updateIngresoVivienda(id, data) {
  return repo.update(id, data);
}

export async function deleteIngresoVivienda(id) {
  return repo.remove(id);
}
