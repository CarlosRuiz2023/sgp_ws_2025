import express from "express";
const router = express.Router();
import ConeccionRoutes from "../routes/coneccion.routes";
import UsuarioRoutes from "../routes/usuario.routes";
import AuthRoutes from "../routes/auth.routes";
import ObraRoutes from "../routes/obra.routes";

export var AppRouting = [
    router.use('/coneccion', ConeccionRoutes),
    router.use('/usuario',UsuarioRoutes),
    router.use('/auth',AuthRoutes),
    router.use('/obra',ObraRoutes),
];