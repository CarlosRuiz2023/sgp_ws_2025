
import { Usuario } from "../models/usuario.model";
import { UtilEmail } from '../utils/UtilEmail';

const utilEmails = new UtilEmail();

export class EmailController {

  public async enviarCorreoInformativo(data: any) {
  try {
    const {
      correo = "juancarlosruizgomez2000@gmail.com",
      titulo = "Notificación",
      mensaje = "Tienes una nueva notificación en el sistema.",
      botonTexto = null,
      botonUrl = null
    } = data;

    const usuario = await Usuario.findOne({ where: { correo } });
    const { nombres } = usuario;

    // BOTÓN OPCIONAL
    const botonHtml = botonTexto && botonUrl ? `
      <div style="text-align:center; margin-top: 20px;">
        <a href="${botonUrl}" 
           style="
              background-color:#003366;
              color:#fff;
              padding: 12px 20px;
              border-radius: 6px;
              text-decoration:none;
              font-size: 16px;
              display:inline-block;
           ">
          ${botonTexto}
        </a>
      </div>
    ` : "";

    const html = `
      <div>
        <table width="500" align="center" style="border:1px solid #ddd; border-radius:8px; overflow:hidden;">
          <tr style="background:#f5f7fa;">
            <td style="text-align:center; padding:20px;">
              <img src="https://res.cloudinary.com/dgyc4mn7w/image/upload/v1764871490/LOGO_FIDOC_AZUL_mbnuzh.png"
                   style="width:160px; height:auto; margin-bottom:5px;" />
            </td>
          </tr>

          <tr>
            <td style="padding: 25px; font-family: Arial;">
              <h2 style="color:#003366; margin-top:0;">${titulo}</h2>

              <p style="font-size:15px; line-height:1.6; color:#333;">
                Hola <strong>${nombres}</strong>,<br><br>
                ${mensaje}
              </p>

              ${botonHtml}

              <br><br>

              <p style="font-size:14px; color:#555;">
                Atentamente,<br>
                Equipo de Soporte Técnico FIDOC<br>
                juan.ruiz@leon.gob.mx
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;

    await utilEmails.enviarCorreo({
      to: correo,
      subject: titulo,
      html: html
    });

    return { msg: "Email sent successfully" };
  } catch (e) {
    console.log(e);
    return {
      msg: "HA OCURRIDO UN ERROR, HABLE CON EL ADMINISTRADOR."
    };
  }
}


}