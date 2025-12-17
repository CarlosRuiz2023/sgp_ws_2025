import { Resend } from "resend";

export class UtilEmail {

    private resend: Resend;

    constructor() {
        this.resend = new Resend(global.ENVGLOBAL?.RESEND_API_KEY || "re_htyyqq6h_CyyGzB3MteatA3dHEhoBMbwo");
    }

    /**
     * Enviar correo
     */
    public async enviarCorreo(opciones: {
        to: string;
        subject: string;
        html?: string | undefined;
        text?: string;
    }): Promise<boolean> {
        try {
            const result = await this.resend.emails.send({
                from: 'FIDOC <onboarding@resend.dev>',
                to: ''+opciones.to,
                subject: ''+opciones.subject,
                html: ''+opciones.html
            });

            return true;
        } catch (error) {
            console.error("❌ Error al enviar correo:", error);
            return false;
        }
    }
}
