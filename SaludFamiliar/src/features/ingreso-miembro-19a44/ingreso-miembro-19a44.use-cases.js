import * as repo from './ingreso-miembro-19a44.repository.js';

export async function create(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function getByMiembroIngresoId(miembroIngresoId) {
  return repo.findByMiembroIngresoId(miembroIngresoId);
}

export async function update(id, data) {
  return repo.update(id, data);
}

export async function remove(id) {
  return repo.remove(id);
}
