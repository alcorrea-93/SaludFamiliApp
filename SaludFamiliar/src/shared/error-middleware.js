export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function globalErrorHandler(err, _req, res, _next) {
  console.error('Error no manejado:', err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido en el body de la solicitud' });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const fields = err.errors?.map(e => e.path).join(', ');
    return res.status(409).json({ error: `Registro duplicado en: ${fields}` });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message, details: err.errors?.map(e => e.message) });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Referencia inválida (FK). Verifica que los IDs referenciados existan.' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}
