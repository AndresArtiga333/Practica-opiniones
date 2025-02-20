import { Router } from "express";
import { agregarPublicacion, actualizarPublicacion, eliminarPublicacion } from "./publicaciones.controller.js";
import { agregarPublicacionValidator, actualizarYEliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router()

router.post("/agregarPublicacion", agregarPublicacionValidator, agregarPublicacion)

router.put("/actualizarPublicacion/:pid", actualizarYEliminarPublicacionValidator, actualizarPublicacion)

router.delete("/eliminarPublicacion/:pid", actualizarYEliminarPublicacionValidator, eliminarPublicacion)

export default router