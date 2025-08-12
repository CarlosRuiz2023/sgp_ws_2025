import jwt from "jwt-simple";
import moment from "moment";
// https://www.npmjs.com/package/jwt-simple

export class JwtService {

    // este es un ejemplo, lo pueden moldear a su gusto
    public async createToken(data:any){
        var payload = {
            sub: data._id,
            email: data.email,
            role: data.role,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix
        };
        return jwt.encode(payload, global.ENVGLOBAL.API.SECRET_KEY);
    }

    public async encode(data: any) {
        return jwt.encode(data, global.ENVGLOBAL.API.SECRET_KEY);
    }

    public async decode(data: any) {
        return await jwt.decode(data, global.ENVGLOBAL.API.SECRET_KEY);
    }

}