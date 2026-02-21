export function ok(res, data) {
  return res.status(200).json(data);
}

export function created(res, data) {
  return res.status(201).json(data);
}

export function noContent(res) {
  return res.status(204).send();
}

export function badRequest(res, message = 'Solicitud inválida') {
  return res.status(400).json({ error: message });
}

export function notFound(res, message = 'No encontrado') {
  return res.status(404).json({ error: message });
}

export function handleError(res, err) {
  console.error(err);
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message, details: err.errors?.map(e => e.message) });
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Referencia inválida (FK)' });
  }
  return res.status(500).json({ error: 'Error interno del servidor' });
}
