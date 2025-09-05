
import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";

import { UtilArchivo } from "../utils/UtilArchivos";
import { Obra } from "../models/obra.model";

const _Util_Archivo = new UtilArchivo();

export class UploadController {

  public async cargarArchivo(req: Request) {
    const archivos: any = req.files as fileUpload.FileArray;

    const nombre = await _Util_Archivo.subirArchivo(archivos, ["pdf","PDF"], "tmp","Prueba");
    return nombre;
  }

  public async mostrarArchivo(req: Request, res: Response) {
    const { id, coleccion } = req.params;
    let modelo: any;

    switch (coleccion) {
      case "obras":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe un candidato con el id ${id}`;
        }
        break;
      case "otro":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe una visita con el id ${id}`;
        }
        break;
      default:
        return "Se me olvido validar esto";
    }
    // Limpiar imágenes previas
    if (modelo.dataValues.traza_du) {
      const pathImagen = path.join(
        __dirname,
        "../../", // Retrocede dos niveles desde la carpeta actual
        "uploads",
        coleccion,
        modelo.dataValues.traza_du
      );
      console.log(pathImagen);
      if (fs.existsSync(pathImagen)) {
        try {
          return res.sendFile(pathImagen);
        } catch (error) {
          console.error("Error al borrar la imagen previa:", error);
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

    let modelo: any;

    switch (coleccion) {
      case "obras":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe un usuario con el id ${id}`;
        }
        break;
      case "otro":
        modelo = await Obra.findOne({
          where: {
            id_obra: id,
          },
        });
        if (!modelo) {
          return `No existe un producto con el id ${id}`;
        }
        break;
      default:
        return "Se me olvido validar esto";
    }
    // Limpiar imágenes previas
    if (modelo.dataValues.traza_du) {
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

    const archivos: any = req.files as fileUpload.FileArray;

    const nombre = await _Util_Archivo.subirArchivo(archivos, ["pdf","PDF"], coleccion,id);
    modelo.dataValues.traza_du = nombre;

    if (coleccion === "obras") {
      await Obra.update(
        { traza_du: nombre },
        {
          where: {
            id_obra: id,
          },
        }
      );
      //await modelo.save();
    }
    if (coleccion === "otro") {
      await modelo.save();
    }
    return modelo;
  }
}