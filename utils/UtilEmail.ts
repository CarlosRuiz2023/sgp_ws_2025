import nodemailer from 'nodemailer';

export class UtilEmail {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "charlyxbox360nuevo@gmail.com",
                pass: global.ENVGLOBAL?.GOOGLE_APP_PASSWORD || 'hyqd pide sljm ovxi',
            },
        });

        this.transporter.verify()
            .then(() => console.log("Ready for send emails"))
            .catch((err) => console.error("Error verifying transporter:", err));
    }

    public getTransporter() {
        return this.transporter;
    }

    /**
     * Método opcional para enviar correos directamente
     */
    public async enviarCorreo(opciones: {
        to: string;
        subject: string;
        html?: string;
        text?: string;
    }) {
        try {
            await this.transporter.sendMail({
                from: `"FIDOC" <charlyxbox360nuevo@gmail.com>`,
                ...opciones
            });

            return true;
        } catch (error) {
            console.error("Error al enviar correo:", error);
            return false;
        }
    }
}
