
import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";

import { UtilArchivo } from "../utils/UtilArchivos";
import { UtilFecha } from "../utils/UtilFecha";
import { Obra } from "../models/obra.model";
import { Estimacion } from "../models/estimacion.model";
import { Solicitud } from "../models/solicitud.model";
import { OficioSapal } from "../models/oficioSapal.model";

const _Util_Fecha = new UtilFecha();
const _Util_Archivo = new UtilArchivo();

export class UploadController {

  public async cargarArchivo(req: Request) {
    const archivos: any = req.files as fileUpload.FileArray;

    const nombre = await _Util_Archivo.subirArchivo(archivos, ["pdf", "PDF"], "tmp", "Prueba");
    return nombre;
  }

  public async mostrarArchivo(req: Request, res: Response) {
    const { id, coleccion } = req.params;
    const { campo } = req.query;
    let modelo: any;

    switch (coleccion) {
      case "obras":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe la obra con el id ${id}`;
        }
        break;
      case "estimaciones":
        modelo = await Estimacion.findOne({
          where: {
            id_estimacion: id,
          },
        });
        if (!modelo) {
          return `No existe la estimacion con el id ${id}`;
        }
        break;
      case "solicitudes":
        modelo = await Solicitud.findOne({
          where: {
            id_solicitud: id,
          },
        });
        if (!modelo) {
          return `No existe la solicitud con el id ${id}`;
        }
        break;
      case "oficioSapal":
        modelo = await OficioSapal.findOne({
          where: {
            id_oficio_sapal: id,
          },
        });
        if (!modelo) {
          return `No existe el oficio sapal con el id ${id}`;
        }
        break;
      default:
        return "Se me olvido validar esto";
    }
    // Limpiar imágenes previas
    if (coleccion === "obras") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        modelo.dataValues.traza_du
      );
      if (fs.existsSync(pathImagen)) {
        try {
          return res.sendFile(pathImagen);
        } catch (error) {
          console.error("Error al consultar el PDF previo", error);
        }
      }
    }

    if (coleccion === "estimaciones") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        modelo.dataValues.estimacion
      );
      if (fs.existsSync(pathImagen)) {
        try {
          return res.sendFile(pathImagen);
        } catch (error) {
          console.error("Error al consultar el PDF previo", error);
        }
      }
    }

    if (coleccion === "solicitudes") {
      if (campo === 'solicitud') {
        const pathImagen = path.join(
          __dirname,
          "../../", // Retrocede dos niveles desde la carpeta actual
          "uploads",
          coleccion,
          campo,
          modelo.dataValues.solicitud
        );
        console.log(pathImagen);
        if (fs.existsSync(pathImagen)) {
          try {
            return res.sendFile(pathImagen);
          } catch (error) {
            console.error("Error al consultar el PDF previo", error);
          }
        }
      }
      if (campo === 'laboratorio') {
        const pathImagen = path.join(
          __dirname,
          "../../", // Retrocede dos niveles desde la carpeta actual
          "uploads",
          coleccion,
          campo,
          modelo.dataValues.laboratorio
        );
        if (fs.existsSync(pathImagen)) {
          try {
            return res.sendFile(pathImagen);
          } catch (error) {
            console.error("Error al consultar el PDF previo", error);
          }
        }
      }
      if (campo === 'mecanica_de_suelos') {
        const pathImagen = path.join(
          __dirname,
          "../../", // Retrocede dos niveles desde la carpeta actual
          "uploads",
          coleccion,
          campo,
          modelo.dataValues.mecanica_de_suelos
        );
        if (fs.existsSync(pathImagen)) {
          try {
            return res.sendFile(pathImagen);
          } catch (error) {
            console.error("Error al consultar el PDF previo", error);
          }
        }
      }
    }

    if (coleccion === "oficioSapal") {
      if (campo === 'recibido') {
        const pathImagen = path.join(
          __dirname,
          "../../", // Retrocede dos niveles desde la carpeta actual
          "uploads",
          coleccion,
          campo,
          modelo.dataValues.oficio_de_recibido
        );
        console.log(pathImagen);
        if (fs.existsSync(pathImagen)) {
          try {
            return res.sendFile(pathImagen);
          } catch (error) {
            console.error("Error al consultar el PDF previo", error);
          }
        }
      }
      if (campo === 'revisado') {
        const pathImagen = path.join(
          __dirname,
          "../../", // Retrocede dos niveles desde la carpeta actual
          "uploads",
          coleccion,
          campo,
          modelo.dataValues.oficio_de_revision
        );
        if (fs.existsSync(pathImagen)) {
          try {
            return res.sendFile(pathImagen);
          } catch (error) {
            console.error("Error al consultar el PDF previo", error);
          }
        }
      }
    }

    const pathImagen = path.join(
      __dirname,
      "../../", // Retrocede dos niveles desde la carpeta actual
      "assets/no-file.jpg"
    );
    res.sendFile(pathImagen);
  }

  public async actualizarArchivo(req: Request) {
    const { id, coleccion } = req.params;
    const { campo } = req.query;

    let modelo: any;

    switch (coleccion) {
      case "obras":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe una obra con el id ${id}`;
        }
        break;
      case "estimaciones":
        modelo = await Estimacion.findOne({
          where: {
            id_estimacion: id,
          },
        });
        if (!modelo) {
          return `No existe una estimacion con el id ${id}`;
        }
        break;
      case "solicitudes":
        modelo = await Solicitud.findOne({
          where: {
            id_solicitud: id,
          },
        });
        if (!modelo) {
          return `No existe una solicitud con el id ${id}`;
        }
        break;
      case "oficioSapal":
        modelo = await OficioSapal.findOne({
          where: {
            id_oficio_sapal: id,
          },
        });
        if (!modelo) {
          return `No existe un Oficio a Sapal con el id ${id}`;
        }
        break;
      default:
        return "Se me olvido validar esto";
    }
    // Limpiar imágenes previas
    if (modelo.dataValues.traza_du && coleccion === "obras") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        modelo.dataValues.traza_du
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.estimacion && coleccion === "estimaciones") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        modelo.dataValues.estimacion
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.solicitud && coleccion === "solicitudes" && campo === "solicitud") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        campo,
        modelo.dataValues.solicitud
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.laboratorio && coleccion === "solicitudes" && campo === "laboratorio") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        campo,
        modelo.dataValues.laboratorio
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.mecanica_de_suelos && coleccion === "solicitudes" && campo === "mecanica_de_suelos") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        campo,
        modelo.dataValues.mecanica_de_suelos
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.oficio_de_recibido && coleccion === "oficioSapal" && campo === "recibido") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        campo,
        modelo.dataValues.oficio_de_recibido
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    if (modelo.dataValues.oficio_de_revisado && coleccion === "oficioSapal" && campo === "revisado") {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        campo,
        modelo.dataValues.oficio_de_revision
      );
      if (fs.existsSync(pathImagen)) {
        try {
          fs.unlinkSync(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
        }
      }
    }

    const archivos: any = req.files as fileUpload.FileArray;

    let nombre: string | any;
    if (campo) {
      nombre = await _Util_Archivo.subirArchivo(archivos, ["pdf", "PDF"], coleccion + "/" + campo, id);
    } else {
      nombre = await _Util_Archivo.subirArchivo(archivos, ["pdf", "PDF"], coleccion, id);
    }
    //modelo.dataValues.traza_du = nombre;

    if (coleccion === "obras") {
      await Obra.update(
        { traza_du: nombre },
        {
          where: {
            id_obra: id,
          },
        }
      );
      modelo.dataValues.traza_du = nombre;
      //await modelo.save();
    }
    if (coleccion === "estimaciones") {
      await Estimacion.update(
        { estimacion: nombre },
        {
          where: {
            id_estimacion: id,
          },
        }
      );
      modelo.dataValues.estimacion = nombre;
      //await modelo.save();
    }
    if (coleccion === "solicitudes") {
      if (campo === "solicitud") {
        await Solicitud.update(
          {
            solicitud: nombre,
            fecha_solicitud: _Util_Fecha.DateNow()
          },
          {
            where: {
              id_solicitud: id,
            },
          }
        );
        modelo.dataValues.solicitud = nombre;
      }
      if (campo === "laboratorio") {
        await Solicitud.update(
          {
            laboratorio: nombre,
            fecha_laboratorio: _Util_Fecha.DateNow()
          },
          {
            where: {
              id_solicitud: id,
            },
          }
        );
        modelo.dataValues.laboratorio = nombre;
      }
      if (campo === "mecanica_de_suelos") {
        await Solicitud.update(
          {
            mecanica_de_suelos: nombre,
            fecha_ms: _Util_Fecha.DateNow()
          },
          {
            where: {
              id_solicitud: id,
            },
          }
        );
      }
      modelo.dataValues.mecanica_de_suelos = nombre;
      //await modelo.save();
    }

    if (coleccion === "oficioSapal") {
      console.log("entro");
      if (campo === "recibido") {
        await OficioSapal.update(
          {
            oficio_de_recibido: nombre
          },
          {
            where: {
              id_oficio_sapal: id,
            },
          }
        );
        modelo.dataValues.oficio_de_recibido = nombre;
      }
      if (campo === "revisado") {
        console.log("hasta aqui todo bien");
        await OficioSapal.update(
          {
            oficio_de_revision: nombre,
          },
          {
            where: {
              id_oficio_sapal: id,
            },
          }
        );
        modelo.dataValues.id_oficio_revision = nombre;
      }
      //await modelo.save();
    }
    /* if (coleccion === "otro") {
      await modelo.save();
    } */
    return modelo;
  }
}