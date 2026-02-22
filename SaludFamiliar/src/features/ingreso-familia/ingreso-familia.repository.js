import {
  IngresoFamilia,
  Familia,
  PeriodoAcademico,
  IngresoVivienda,
  IngresoViviendaAnimal,
  IngresoFamiliaMiembro,
  IngresoMiembro0a18,
  IngresoMiembro19a44,
  IngresoMiembro45Mas,
  IngresoMiembroGestante,
} from '../../models/index.js';

export async function create(data) {
  return IngresoFamilia.create(data);
}

export async function findById(id) {
  return IngresoFamilia.findByPk(id, {
    include: [
      { model: Familia, attributes: ['id', 'nombre_familia'] },
      { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
    ],
  });
}

export async function findAll({ periodo_id, familia_id, page, limit }) {
  const where = {};
  if (periodo_id != null) where.periodo_id = periodo_id;
  if (familia_id != null) where.familia_id = familia_id;
  const offset = (page - 1) * limit;
  const { count, rows } = await IngresoFamilia.findAndCountAll({
    where,
    include: [
      { model: Familia, attributes: ['id', 'nombre_familia'] },
      { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
    ],
    order: [['creado_en', 'DESC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function findCompleto(id) {
  return IngresoFamilia.findByPk(id, {
    include: [
      { model: Familia, attributes: ['id', 'nombre_familia', 'vereda_id', 'telefono_contacto'] },
      { model: PeriodoAcademico, attributes: ['id', 'codigo', 'anio', 'semestre'] },
      {
        model: IngresoVivienda,
        include: [{ model: IngresoViviendaAnimal }],
      },
      {
        model: IngresoFamiliaMiembro,
        include: [
          { model: IngresoMiembro0a18, required: false },
          { model: IngresoMiembro19a44, required: false },
          { model: IngresoMiembro45Mas, required: false },
          { model: IngresoMiembroGestante, required: false },
        ],
      },
    ],
  });
}

export async function update(id, data) {
  const row = await IngresoFamilia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await IngresoFamilia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
