import express from "express";
const router = express.Router();
import ConeccionRoutes from "../routes/coneccion.routes";
import UsuarioRoutes from "../routes/usuario.routes";
import AuthRoutes from "../routes/auth.routes";
import ObraRoutes from "../routes/obra.routes";
import ColoniaRoutes from "../routes/colonia.routes";
import UploadRoutes from "../routes/upload.routes";
import RolRoutes from "../routes/rol.routes";
import EmpresaRoutes from "../routes/empresa.routes";
import ComiteRoutes from "../routes/comite.routes";
import EstimacionRoutes from "../routes/estimacion.routes";
import ContratoRoutes from "../routes/contrato.routes";
import SolicitudRoutes from "../routes/solicitud.routes";
import OficioSapalRoutes from "../routes/oficioSapal.routes";
import EntregaRoutes from "../routes/entrega.routes";
import FirmaRoutes from "../routes/firma.routes";
import EmailRoutes from "../routes/email.routes";

export var AppRouting = [
    router.use('/coneccion', ConeccionRoutes),
    router.use('/usuario',UsuarioRoutes),
    router.use('/auth',AuthRoutes),
    router.use('/obra',ObraRoutes),
    router.use('/colonia',ColoniaRoutes),
    router.use('/upload',UploadRoutes),
    router.use('/rol',RolRoutes),
    router.use('/empresa',EmpresaRoutes),
    router.use('/comite',ComiteRoutes),
    router.use('/estimacion',EstimacionRoutes),
    router.use('/contrato',ContratoRoutes),
    router.use('/solicitud',SolicitudRoutes),
    router.use('/oficio-sapal',OficioSapalRoutes),
    router.use('/entrega',EntregaRoutes),
    router.use('/firma',FirmaRoutes),
    router.use('/email',EmailRoutes)
];