import { UploadedFile } from "express-fileupload";
import path from "path";
export class UtilArchivo {
    public subirArchivo(files: { archivo: UploadedFile },
        extensionesValidas: string[] = ["pdf","PDF"],
        carpeta = "",
        id: string = "Prueba") {
        try {
            const { archivo } = files;
            const nombreCortado = archivo.name.split(".");
            const extension = nombreCortado[nombreCortado.length - 1];

            // Validar la extensión
            if (!extensionesValidas.includes(extension)) {
                return (
                    `La extensión ${extension} no es permitida, ${extensionesValidas}`
                );
            }

            //const nombreTemp = uuidv4() + "." + extension;
            const nombreTemp = id+"." + extension;
            const uploadPath = path.join(
                __dirname,
                "../../",
                "uploads",
                carpeta,
                nombreTemp
            );

            archivo.mv(uploadPath, (err: any) => {
                if (err) {
                    return (err);
                }                
                return (nombreTemp);
            });
            return nombreTemp;
        } catch (error) {
            return error;
        }
    }
}