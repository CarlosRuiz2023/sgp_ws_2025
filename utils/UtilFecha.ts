const moment = require('moment');
const momentZone = require('moment-timezone');

export class UtilFecha {

    DateNow() {
        var fecha = (new Date()).toLocaleString('se-SE', { timeZone: 'America/Mexico_City' }) + "Z";
        return new Date(fecha);
    }

    MomentNow() {
        var fecha = moment().format();
        return fecha
    }

    MomentZoneNow() {
        var fecha = momentZone().tz('America/Mexico_City').format();
        return fecha;
    }

    Add_Days(fecha: any, dias: number) {
        var fecha = moment(fecha).add(dias, 'days').format();
        return new Date(fecha);
    }

    Teen_minutes_before() {
        const mexicoTime = (new Date()).toLocaleString('se-SE', { timeZone: 'America/Mexico_City' }) + "Z";     timeZone: 'America/Mexico_City'
        const fechaLocal = new Date(mexicoTime); // convierte string a Date (depende del formato del navegador)
        fechaLocal.setMinutes(fechaLocal.getMinutes() - 10); // resta 10 minutos
        return fechaLocal;
    }
}
