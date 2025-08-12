export class UtilBoolean {

    public async toBoolean(valor: any, retornarFalse = false) {
        if (`${valor}` == `true` || `${valor}` == '1') {
            return true;
        }
        if (`${valor}` == 'false' || `${valor}` == '0') {
            return false;
        }
        return (retornarFalse ? false : null); // Verificación para saber si retornará cero en caso de un valor incorrecto 
    }

}