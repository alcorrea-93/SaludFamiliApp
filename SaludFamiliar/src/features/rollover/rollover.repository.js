import { sequelize } from '../../models/index.js';
import { QueryTypes } from 'sequelize';
import {
  AsignacionFamiliaGrupo,
  PeriodoAcademico,
} from '../../models/index.js';

export async function getFamiliasActivasDelPeriodo(periodoOrigenId) {
  return sequelize.query(`
    SELECT afg.familia_id, afg.grupo_id, afg.notas
    FROM asignacion_familia_grupo afg
    JOIN familia f ON f.id = afg.familia_id
    LEFT JOIN historial_estado_familia h ON h.familia_id = f.id
      AND h.fecha_hasta IS NULL
    LEFT JOIN estado_familia ef ON ef.id = h.estado_id
    WHERE afg.periodo_id = :periodo_id
      AND (ef.codigo IS NULL OR ef.codigo != 'PERDIDA')
  `, { replacements: { periodo_id: periodoOrigenId }, type: QueryTypes.SELECT });
}

export async function ejecutarRollover(periodoOrigenId, periodoDestinoId, grupoDestinoId) {
  const familias = await getFamiliasActivasDelPeriodo(periodoOrigenId);
  if (!familias.length) return { promovidas: 0, mensaje: 'No hay familias activas para promover' };

  const nuevas = [];
  for (const fam of familias) {
    const [created, isNew] = await AsignacionFamiliaGrupo.findOrCreate({
      where: {
        periodo_id: periodoDestinoId,
        grupo_id: grupoDestinoId || fam.grupo_id,
        familia_id: fam.familia_id,
      },
      defaults: {
        periodo_id: periodoDestinoId,
        grupo_id: grupoDestinoId || fam.grupo_id,
        familia_id: fam.familia_id,
        notas: `Promovida desde periodo ${periodoOrigenId}`,
      },
    });
    if (isNew) nuevas.push(created);
  }

  return {
    promovidas: nuevas.length,
    ya_existentes: familias.length - nuevas.length,
    total_familias_origen: familias.length,
  };
}

export async function preview(periodoOrigenId) {
  return getFamiliasActivasDelPeriodo(periodoOrigenId);
}
