import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario } from "./comentarios.controller.js";
import { agregarComentarioValidator, actualizarComentarioValidator, eliminarComentarioValidator } from "../middlewares/comentarios-validator.js";

const router = Router()

router.post("/agregarComentario/:pid", agregarComentarioValidator, agregarComentario)

router.patch("/actualizarComentario/:cid", actualizarComentarioValidator, editarComentario)

router.delete("/eliminarComentario/:cid", eliminarComentarioValidator, eliminarComentario)
export default router;