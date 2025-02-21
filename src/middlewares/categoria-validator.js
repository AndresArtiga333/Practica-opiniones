import { body } from "express-validator";
import { validateJWT } from "./validate-jwt.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { hasRoles } from "./validar-roles.js";

export const agregarCategoriaValidator =[
        validateJWT,
        hasRoles("ADMIN"),
        body("nombre").notEmpty().withMessage("El nombre es requerido"),
        validarCampos,
        handleErrors
]


export const editarCategoriaValidator =[
    validateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const eliminarCategoriaValidator =[
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]
