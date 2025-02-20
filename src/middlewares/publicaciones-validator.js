import { body, param } from "express-validator";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validar-roles.js";
import { validarCampos } from "./validar-campos.js";

export const agregarPublicacionValidator =[
    validateJWT,
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("categoria").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("texto").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]

export const actualizarYEliminarPublicacionValidator=[
    validateJWT,
    param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

