import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Usuario } from "../models/usuario.model";

export class UtilEmail {

    private mailerSend: MailerSend;

    constructor() {
        // Configurar API Key
        this.mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY || 'mlsn.307509db207589fe33d2b991b2e81db4521ae410c6f8eb985a1aa719f3b75968',
        });
    }

    /**
     * Enviar correo
     */
    public async enviarCorreo(opciones: {
        to: string;
        subject: string;
        html?: string;
        text?: string;
    }): Promise<boolean> {
        try {
            const sentFrom = new Sender("noreply@test-3m5jgroq80xgdpyo.mlsender.net", "Charly Gomez");
            const usuario = await Usuario.findOne({ where: { correo: opciones.to } });
            const { nombres } = usuario;
            const recipients = [
                new Recipient(''+opciones.to, nombres || 'Anonimo')
            ];

            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setReplyTo(sentFrom)
                .setSubject(opciones.subject || "")
                .setHtml(opciones.html || "")
                .setText(opciones.text || "");

            await this.mailerSend.email.send(emailParams);

            return true;
        } catch (error: any) {
            console.error("❌ Error al enviar correo:");
            if (error.response) {
                console.error("Status:", error.response.statusCode);
                console.error("Body:", error.response.body);
            } else {
                console.error(error);
            }

            return false;
        }
    }
}