import { Familia, Vereda, Territorio } from '../../models/index.js';
import { Op } from 'sequelize';

const VEREDA_INCLUDE = {
  model: Vereda,
  attributes: ['id', 'nombre'],
  include: [{ model: Territorio, attributes: ['id', 'nombre', 'municipio'] }],
};

export async function create(data) {
  const familia = await Familia.create(data);

  if (!familia.codigo_familia && familia.vereda_id && familia.numero_familia != null) {
    const vereda = await Vereda.findByPk(familia.vereda_id, {
      include: [{ model: Territorio, attributes: ['municipio'] }],
    });
    if (vereda) {
      const mun = vereda.Territorio?.municipio || '000';
      const ver = String(vereda.id).padStart(3, '0');
      const num = String(familia.numero_familia).padStart(4, '0');
      familia.codigo_familia = `${mun}-${ver}-${num}`;
      await familia.save();
    }
  }
  return familia;
}

export async function findById(id) {
  return Familia.findByPk(id, { include: [VEREDA_INCLUDE] });
}

export async function findByCodigo(codigoFamilia) {
  return Familia.findOne({
    where: { codigo_familia: codigoFamilia },
    include: [VEREDA_INCLUDE],
  });
}

export async function findAll({ vereda_id, q, page, limit }) {
  const where = {};
  if (vereda_id != null) where.vereda_id = vereda_id;
  if (q) {
    where[Op.or] = [
      { nombre_familia: { [Op.iLike]: `%${q}%` } },
      { codigo_familia: { [Op.iLike]: `%${q}%` } },
    ];
  }
  const offset = (page - 1) * limit;
  const { count, rows } = await Familia.findAndCountAll({
    where,
    include: [VEREDA_INCLUDE],
    order: [['nombre_familia', 'ASC']],
    limit,
    offset,
  });
  return { total: count, page, limit, data: rows };
}

export async function update(id, data) {
  const row = await Familia.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

export async function remove(id) {
  const row = await Familia.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}
