export class UtilAxios {

    filtraData(resultado: any) {
        // Permite armar la respuesta para que en caso de que ocurra un error retorne un objeto sin todo el track de la petición
        if (resultado.data && resultado.data.data) return resultado.data.data;
        if (resultado.data) return resultado.data;
        return resultado;
    }

    filtraError(resultado: any) {
        let error: any = {};
        // Lista de propiedades que podrían venir en los campos de errores de las peticiones
        if (resultado) {
            if (resultado.status) error.status = resultado.status;
            if (resultado.statusText) error.statusText = resultado.statusText;
            if (resultado.response) {
                if (resultado.response.statusText) error.statusText = resultado.response.statusText;
                if (resultado.response.data) error.data = resultado.response.data;
                if (resultado.response.errorData) error.errorData = resultado.response.errorData;
            }
        }
        // Si existe información del error procesada entonces se retorna
        if (Object.keys(error).length) { return { error: error }; }
        return resultado;
    }
}