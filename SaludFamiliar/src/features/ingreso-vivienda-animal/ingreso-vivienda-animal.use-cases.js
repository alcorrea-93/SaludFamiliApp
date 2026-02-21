import * as repo from './ingreso-vivienda-animal.repository.js';

export async function createIngresoViviendaAnimal(data) {
  return repo.create(data);
}

export async function getById(id) {
  return repo.findById(id);
}

export async function listByViviendaId(ingresoViviendaId) {
  return repo.findByViviendaId(ingresoViviendaId);
}

export async function updateIngresoViviendaAnimal(id, data) {
  return repo.update(id, data);
}

export async function deleteIngresoViviendaAnimal(id) {
  return repo.remove(id);
}
