import { Router } from "express";
import { agregarComentario } from "./comentarios.controller.js";
import { agregarComentarioValidator } from "../middlewares/comentarios-validator.js";

const router = Router()

router.post("/agregarComentario/:pid", agregarComentarioValidator, agregarComentario)

export default router;