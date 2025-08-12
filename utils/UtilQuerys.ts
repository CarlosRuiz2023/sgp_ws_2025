interface QueryResponse {
    count: number;
    rows: any[];
}
export class UtilQuerys {
    public validarRespuestaFindAllSQLServer(resp: QueryResponse, nombreConsulta = 'Consulta SQL') {
        try {
            if (!resp || typeof resp !== 'object') return false;
            const { count, rows } = resp;
            if (typeof count !== 'number') return false;
            if (!Array.isArray(rows)) return false;
            if (count === 0 || rows.length === 0) return false;
            // Si pasa todas las validaciones, regresa true o incluso puedes devolver el mismo objeto validado
            return true;
        } catch (error) {
            return false;
        }
    }
    
    public validarRespuestaFindOneSQLServer(resp: any, nombreConsulta = 'Consulta SQL') {
        try {
            if (!resp || typeof resp !== 'object') return false;
            return true;
        } catch (error) {
            return false;
        }
    }
    
    public validarRespuestaUpdateSQLServer(resp: any, nombreConsulta = 'Update SQL') {
        try {
            if (!Array.isArray(resp)) return false;
            const [affectedRows] = resp;
            if (typeof affectedRows !== 'number') return false;
            if (affectedRows === 0) return false;
            return true;
        } catch (error) {
            return false;
        }
    }
    
    public validarRespuestaDeleteSQLServer(resp: any, nombreConsulta = 'Delete SQL') {
        try {
            if (typeof resp !== 'number') return false;
            if (resp === 0) return false;
            return true;
        } catch (error) {
            return false;
        }
    }
    
    public validarRespuestaFindAccess(resp: any, nombreConsulta = 'Consulta SQL') {
        try {
            if (!Array.isArray(resp)) return false;
            if (resp.length === 0) return false;
            return true;
        } catch (error) {
            return false;
        }
    }
}