import jwt from "jsonwebtoken";
export class UtilJwt {
    public generarJWT(id_usuario: number = 1) {
        try {
            const payload = { id_usuario };
            const token = jwt.sign(
                payload,
                process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913",
                { expiresIn: "4h" }
            );
            return token;
        } catch (error) {
            console.log(error);
            return "";
        }
    }
}