import { Router } from "express";
import { actualizarUsuario, actualizarContraseña } from "./user.controller.js";
import { actualizarUsuarioValidator, actualizarContraValidator } from "../middlewares/user-validator.js";

const router = Router()

router.put("/actualizarUsuario", actualizarUsuarioValidator, actualizarUsuario);

router.patch("/actualizarContra", actualizarContraValidator, actualizarContraseña)

export default router;