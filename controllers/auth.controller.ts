import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import { Usuario } from "../models/usuario.model";
import { UtilJwt } from "../utils/UtilJwt";
import { UtilEmail } from '../utils/UtilEmail';
import { Acceso } from "../models/acceso.model";
import { UtilFecha } from "../utils/UtilFecha";
import { ModuloPermiso } from "../models/modulo_permiso.model";
import { Modulo } from "../models/modulo.model";
import { Permiso } from "../models/permiso.model";
import { Rol } from "../models/rol.model";
import { Response } from "express";

const _Util_Jwt = new UtilJwt();
const _Util_Fecha = new UtilFecha();
const utilEmails = new UtilEmail();

export class AuthController {

  public async loguearUsuario(data: any) {
    const params = await data;
    const { correo, contrasenia } = params;

    const usuario = await Usuario.findOne({ where: { correo } });
    const { id_usuario, contrasenia: contrasenia_recupearada, estatus, token: token_recuperado } = usuario;

    const result = await Acceso.findAll({
      where: {
        id_usuario, exitoso: false,
        fecha_hora: { [Op.gte]: _Util_Fecha.Teen_minutes_before() }
      }
    });

    if (result.length > 4) {
      return "Usted ha alcanzado el limite de intetos pruebe dentro de 10 mins.";
    }

    if (estatus != 1) {
      return "El Usuario se encuentra deshabilidado";
    }

    if (token_recuperado == null) {

      // Verificar contraseña
      const validPassword = bcryptjs.compareSync(contrasenia, contrasenia_recupearada);
      if (!validPassword) {
        await Acceso.create({
          id_usuario,
          fecha_hora: _Util_Fecha.DateNow(),
          exitoso: false
        });
        return "Usuario / Password no son correctos - password";
      }

      // Generar JWT
      const token = await _Util_Jwt.generarJWT(id_usuario);

      await Usuario.update({ token }, { where: { id_usuario } });

      await Acceso.create({
        id_usuario,
        fecha_hora: _Util_Fecha.DateNow(),
        exitoso: true
      });

      const usuario_logueado = await Usuario.findOne({ where: { correo } });

      // ===================================================================================
      // OBTENER PERMISOS
      // ===================================================================================

      const permisos_raw = await ModuloPermiso.findAll({
        where: { id_rol: usuario_logueado.id_rol },
        include: [
          {
            model: Modulo,
            as: "modulo",
            attributes: ["modulo"]
          },
          {
            model: Permiso,
            as: "permiso",
            attributes: ["permiso"]
          },
          {
            model: Rol,
            as: "rol",
            attributes: ["rol"]
          }
        ]
      });

      // ===================================================================================
      // TRANSFORMAR ESTRUCTURA → { "Obras": ["Consultar", "Agregar"] }
      // ===================================================================================

      const permisos_por_modulo: any = {};

      permisos_raw.forEach((item: any) => {
        const nombre_modulo = item.modulo.modulo;
        const permiso = item.permiso.permiso;

        // Si no existe el módulo, lo creamos
        if (!permisos_por_modulo[nombre_modulo]) {
          permisos_por_modulo[nombre_modulo] = [];
        }

        // Insertar el permiso
        permisos_por_modulo[nombre_modulo].push(permiso);
      });

      // ===================================================================================
      // RESPUESTA FINAL
      // ===================================================================================

      return {
        Usuario: usuario_logueado,
        permisos_por_modulo
      };
    } else {
      return "El Usuario ya se encuentra logueado";
    }
  }

  public async recuperarContrasenia(data: any) {
    try {
      // EXTRAE EL CORREO DEL CUERPO DE LA SOLICITUD.
      const { correo = "juancarlosruizgomez2000@gmail.com" } = data;
      const asunto = "Solicitud de cambio de contraseña";

      let {
        mensaje = `Usted ha solicitado restablecer su contraseña. <br> Por favor ingresa y confirma tu nueva contraseña en el siguiente formulario:`,
      } = data;

      const usuario = await Usuario.findOne({ where: { correo } });

      const { id_usuario, nombres } = usuario;

      // Generar JWT
      const token = await _Util_Jwt.generarJWT(id_usuario);

      const loginUrl = `${global.ENVGLOBAL?.IP || "https://sgp-ws-2025.onrender.com"}/auth/`;

      // CONSTRUIMOS EL FORMULARIO
      const resetForm = `
      <form style="max-width: 500px; margin: 0 auto; border: 2px solid #ccc; padding: 20px;" method="POST" action="${loginUrl}cambiarContrasenia/${token}">
        <h2 style="text-align: center;">Restablecer contraseña</h2>
        <label style="display:block; margin-bottom: 10px; color: #003366;" for="password">Nueva contraseña:</label>
        <input style="display: block; padding: 10px; width: 95%; border-radius: 4px; border: 2px solid #003366;" type="password" id="password" name="password" placeholder="New Password">
        <br>
        <label style="display:block; margin-bottom: 10px; color: #003366;" for="password">Confirma tu contraseña:</label>
        <input style="display: block; padding: 10px; width: 95%; border-radius: 4px; border: 2px solid #003366;" type="password" id="passwordConfim" name="passwordConfirm" placeholder="New Password">
        <button style="display: block; margin: 20px auto 0; padding: 10px; background-color: #003366; color: #fff; border-radius: 4px; border: none;" type="submit">
          Cambiar contraseña
        </button>
      </form>
    
    `;
      // CREAMOS EL CUERPO DEL MENSAJE
      const html = `
      <div>
        <table width="500" align="center">
          <tr>
            <td style="text-align: center">
              <div style="position: relative">
                <div style="position: absolute; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                  <img style="margin-left: 50px;margin-right: 8px;margin-top: 2px;width: 120px; height: 50px" src="https://res.cloudinary.com/dgyc4mn7w/image/upload/v1764871490/LOGO_FIDOC_AZUL_mbnuzh.png" />
                </div>
              <div style="position: absolute; border: 1px hsla(219, 63%, 25%, 1.00) solid"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">    
              <h1 style="display:block; color: #003366;" for="password">Cambio de contraseña</h1>
              <p style="font-size: 15px;">
                Buen día ${nombres}. ${mensaje}
              </p>
              ${resetForm}
              <p style="font-size: 15px;">
                Atentamente, equipo de Soporte Técnico FIDOC<br>
                juan.ruiz@leon.gob.mx
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;

      // Para enviar un correo:
      await utilEmails.enviarCorreo({
        to: correo,
        subject: asunto,
        html: html
      });

      // RESPONDEMOS DE FORMA POSITIVA
      return { msg: "Email sent successfully" };
    } catch (error) {
      // MANEJO DE ERRORES: IMPRIME EL ERROR EN LA CONSOLA Y RESPONDE CON UN ERROR HTTP 500.
      console.log(error);
      return {
        msg: "HA OCURRIDO UN ERROR, HABLE CON EL ADMINISTRADOR."
      };
    }
  }


  public async desloguearUsuario(data: any) {
    const params = await data;
    const { id_usuario } = params;
    await Usuario.update({
      token: null
    }, { where: { id_usuario } });
    return `Usuario ${id_usuario} deslogueado correctamente`;
  }

  public async desloguearUsuarioToken(data: any) {
    const params = await data;
    const { usuario } = params;
    const { id_usuario } = usuario;
    await Usuario.update({
      token: null
    }, { where: { id_usuario } });
    return `Usuario ${id_usuario} deslogueado correctamente`;
  }

  public async checkStatus(data: any) {
    const params = await data;
    const { usuario } = params;
    const { id_usuario } = usuario;
    // si quieres renovar token
    const token = _Util_Jwt.generarJWT(id_usuario);
    await Usuario.update({
      token
    }, { where: { id_usuario } });
    const usuario_logueado = await Usuario.findByPk(id_usuario);

    return {
      token,
      Usuario: usuario_logueado  // <-- info del usuario
    };
  }

  public async cambiarContrasenia(data: any, res: Response) {
    const body = await data;   // 👈 IMPORTANTE

    const { token, password, passwordConfirm } = body;

    // VERIFICAMOS SI SON IGUALES AMBAS VARIABLES
    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        data: "Error passwords diferentes intente de nuevo"
      });
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        data: "No hay token en la peticion"
      });
    }

    const payload = jwt.verify(
      token,
      process.env.SECRETORPRIVATEKEY || "Est03sMyPublick3y23@913"
    );
    const { id_usuario }: any = payload;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(400).json({
        success: false,
        data: "Token no valido - usuario no existe DB"
      });
    }

    if (usuario.estatus !== 1) {
      return res.status(400).json({
        success: false,
        data: "Token no valido - usuario inactivo"
      });
    }

    // ENCRIPTAMOS LA CONTRASEÑA.
    const salt = bcryptjs.genSaltSync();
    const passwordEncriptada = bcryptjs.hashSync(password, salt);

    // ACTUALIZAMOS LA CONTRASEÑA.
    usuario.contrasenia = passwordEncriptada;
    usuario.contrasenia_visible = password;

    // GUARDAMOS LOS CAMBIOS EN LA BASE DE DATOS.
    await usuario.save();

    // URL dinámica
    const loginUrl = `${global.ENVGLOBAL?.IP || "https://sgp-ws-2025.onrender.com"}/auth/login`;

    // Aquí insertamos tu HTML
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contraseña actualizada</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.2/dist/full.css" rel="stylesheet" type="text/css" />
    </head>
    <body class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div class="card w-full max-w-md shadow-2xl bg-white rounded-2xl border border-gray-200 animate-fadeIn p-6">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 class="text-3xl font-extrabold text-gray-800">¡Contraseña actualizada!</h2>
          <p class="text-gray-600 text-lg">Tu contraseña se ha actualizado exitosamente. Ya puedes ingresar al sistema nuevamente.</p>

          <a href="${loginUrl}" class="btn btn-primary btn-wide mt-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            Ir a iniciar sesión
          </a>
        </div>
      </div>

      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);} 
          to   { opacity: 1; transform: translateY(0);} 
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      </style>
    </body>
    </html>
    `;

    return res.send(html);
  }
}