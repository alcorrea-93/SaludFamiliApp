import * as repo from './ingreso-familia-miembro.repository.js';

export async function createIngresoFamiliaMiembro(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function list(filters) {
  return repo.findAll(filters);
}

export async function updateIngresoFamiliaMiembro(id, data) {
  return repo.update(id, data);
}

export async function deleteIngresoFamiliaMiembro(id) {
  return repo.remove(id);
}
