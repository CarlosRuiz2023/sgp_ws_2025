import { writeFileSync, appendFile } from 'fs';
export class UtilLogError {

    escribirErrorEnLog = (mensajeError: string): void => {
        const fechaHoraActual = this.obtenerFechaHoraActual();
        const mensajeLog = `[${fechaHoraActual}] ERROR: ${mensajeError}\n`;

        appendFile('logfile.txt', mensajeLog, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro:', err);
            }
        });
    }

    private obtenerFechaHoraActual = (): string => {
        const fechaHora = new Date();
        const dia = this.agregarCeroAlInicio(fechaHora.getDate());
        const mes = this.agregarCeroAlInicio(fechaHora.getMonth() + 1);
        const anio = fechaHora.getFullYear();
        const horas = this.agregarCeroAlInicio(fechaHora.getHours());
        const minutos = this.agregarCeroAlInicio(fechaHora.getMinutes());
        const segundos = this.agregarCeroAlInicio(fechaHora.getSeconds());

        return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
    }

    private agregarCeroAlInicio = (numero: number): string => {
        return numero < 10 ? `0${numero}` : numero.toString();
    }
}
