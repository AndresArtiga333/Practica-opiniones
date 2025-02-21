import { Router } from "express";
import { agregarCategoria, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { agregarCategoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

router.post("/agregarCategoria", agregarCategoriaValidator, agregarCategoria)

router.patch("/editarCategoria/:caid", editarCategoriaValidator, editarCategoria)

router.delete("/eliminarCategoria/:caid", eliminarCategoriaValidator, eliminarCategoria)

export default router