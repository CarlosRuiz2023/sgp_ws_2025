import { UtilFecha } from "../utils/UtilFecha";
import { Usuario } from "../models/usuario.model";
import { Obra } from "../models/obra.model";
import { col, fn, Op, where } from "sequelize";
import { Firma } from "../models/firma.model";

const _Util_Fecha = new UtilFecha();

export class FirmaController {

  public async obtenerFirmas(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
      if (filtro === 'id_usuario') {
        const usuario = await Usuario.findAll({
          where: where(
            fn(
              "unaccent",
              fn(
                "concat",
                col("apellido_paterno"),
                " ",
                col("apellido_materno"),
                " ",
                col("nombres")
              )
            ),
            {
              [Op.iLike]: `%${busqueda}%`
            }
          )     // búsquedas parciales
        });
        busqueda = usuario.map((u: any) => u.id_usuario);
      }
      if (filtro === 'id_obra') {
        const obra = await Obra.findAll({
          where: where(
            fn("unaccent", col("calle")),
            {
              [Op.iLike]: `%${busqueda}%`  // iLike = case-insensitive
            }
          )
        });
        busqueda = [];
        for (let index = 0; index < obra.length; index++) {
          const { id_obra } = obra[index];
          busqueda.push(id_obra);
        }
      }

      result = await Firma.findAndCountAll({
        where:
          filtro === 'id_firma'
            ? {
              id_firma

                : { [Op.eq]: busqueda }
            }
            : filtro === 'id_usuario'
              ? {
                [Op.or]: [
                  { id_usuario: { [Op.in]: busqueda } },
                ],
              }
              : filtro === 'id_obra'
                ? { id_obra: { [Op.in]: busqueda } }
                : { [filtro]: busqueda },
        order: [['id_firma', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'firmador',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    } else {
      result = await Firma.findAndCountAll({
        order: [['id_firma', 'DESC']],
        limit,
        offset,
        include: [{
          model: Usuario,
          as: 'firmador',
          attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
        },
        {
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        }]
      });
    }

    return {
      firmas: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarFirma(data: any) {
    const params = await data;
    const { id_obra, id_usuario } = params;
    const nueva_firma = await Firma.create({
      id_usuario,
      id_obra
    });

    const firma_recuperada = await Firma.findByPk(nueva_firma.id_firma, {
      include: [{
        model: Usuario,
        as: 'firmador',
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno']
      }, {
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      }]
    });

    return firma_recuperada;
  }

  public async actualizarFirma(data: any) {
    const params = await data;
    const { id_firma, id_obra, id_usuario } = params;
    await Firma.update({
      id_obra,
      id_usuario
    }, { where: { id_firma } });

    return `Firma ${id_firma} actualizada correctamente`;
  }

  public async eliminarFirma(data: any) {
    const params = await data;
    const { id_firma } = params;
    await Firma.update({
      estatus: 0
    }, { where: { id_firma } });

    return `Firma ${id_firma} elimanda logicamente correctamente`;
  }

  public async activarFirma(data: any) {
    const params = await data;
    const { id_firma } = params;
    await Firma.update({
      estatus: 1
    }, { where: { id_firma } });

    return `Firma ${id_firma} activada logicamente correctamente`;
  }
}