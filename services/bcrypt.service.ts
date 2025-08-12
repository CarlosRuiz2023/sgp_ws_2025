import bcrypt from "bcryptjs";
var salt_size = 10;
var salt = bcrypt.genSaltSync(salt_size);
// https://www.npmjs.com/package/bcryptjs

export class BcryptService {

    public async hash(param: string) {
        return bcrypt.hashSync(param, salt);
    }

    public async compare(hash_data: string, param_to_compare: string) {
        return await bcrypt.compare(hash_data, param_to_compare);
    }
    
}