import { col, fn, Op, where } from "sequelize";
import { Comite } from "../models/comite.model";
import { UtilFecha } from "../utils/UtilFecha";
import { Obra } from "../models/obra.model";
import { Usuario } from "../models/usuario.model";

const _Util_Fecha = new UtilFecha();

export class ComiteController {

  public async obtenerComite(data: any) {
    const params = await data;
    const { id_comite } = params;
    const comite = await Comite.findByPk(id_comite, {
      include: [{
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nombre', 'apellido_paterno', 'apellido_materno']
      }
      ]
    });
    return comite;
  }

  public async obtenerComites(data: any) {
    const params = await data;
    const { limit, offset } = params;
    let { filtro, busqueda } = params;

    let result = null;

    if (filtro != undefined || filtro != undefined) {
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

      result = await Comite.findAndCountAll({
        where: {
          [filtro]: filtro === 'id_comite'
            ? { [Op.eq]: busqueda }            // coincidencia exacta
            : filtro === 'id_obra'
              ? { [Op.in]: busqueda }             // arreglo de ids
              : busqueda,                         // coincidencia exacta
        },
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
        include: [{
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nombre', 'apellido_paterno', 'apellido_materno']
        }
        ]
      });
    } else {
      result = await Comite.findAndCountAll({
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
        include: [{
          model: Obra,
          as: 'obra',
          attributes: ['calle']
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nombre', 'apellido_paterno', 'apellido_materno']
        }
        ]
      });
    }

    return {
      comites: result.rows,              // Lista de obras paginadas
      total: result.count,             // Total de obras sin paginación
      totalPaginas: Math.ceil(result.count / limit), // Total de páginas
      paginaActual: Math.floor(offset / limit) + 1   // Página actual
    };
  }

  public async agregarComite(data: any) {
    const params = await data;
    const { id_obra, tipo, punto, costo, usuario } = params.body;
    const { id_usuario } = usuario;
    console.log(params.body);

    let sesion = 1;
    try {
      const comites = await Comite.findAll({ where: { id_obra } });
      if (comites.length > 0) {
        sesion = comites.length + 1;
      }
    } catch (error) {
    }
    const nuevo_comite = await Comite.create({
      id_obra,
      id_usuario,
      sesion,
      tipo,
      punto,
      costo,
      fecha_creacion: _Util_Fecha.DateNow()
    });
    const comite_recuperado = null;

    /* const comite_recuperado = await Obra.findByPk(nuevo_comite.id_comite, {
      include: [{
        model: Obra,
        as: 'obra',
        attributes: ['calle']
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nombre', 'apellido_paterno', 'apellido_materno']
      }
      ]
    }); */

    return comite_recuperado;
  }

  /* public async actualizarComite(data: any) {
    const params = await data;
    const { id_comite, id_obra, calle, traza_du, tramo, finiquito } = params;
    await Obra.update({
      id_colonia,
      calle,
      traza_du,
      tramo,
      finiquito,
      updatedAt: _Util_Fecha.DateNow()
    }, { where: { id_obra } });

    return `Obra ${id_obra} actualizada correctamente`;
  } */

  public async eliminarComite(data: any) {
    const params = await data;
    const { id_comite } = params;
    await Comite.update({
      estatus: 0
    }, { where: { id_comite } });

    return `Comite ${id_comite} elimando logicamente correctamente`;
  }

  public async activarComite(data: any) {
    const params = await data;
    const { id_comite } = params;
    await Comite.update({
      estatus: 1
    }, { where: { id_comite } });

    return `Comite ${id_comite} activado logicamente correctamente`;
  }
}