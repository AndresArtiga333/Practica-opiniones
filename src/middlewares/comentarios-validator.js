import { body, param } from "express-validator";
import { validateJWT } from "./validate-jwt.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";

export const agregarComentarioValidator =[
    validateJWT,
        body("texto").notEmpty().withMessage("El texto es requerido"),
        param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
        validarCampos,
        handleErrors
]

export const actualizarComentarioValidator =[
    validateJWT,
    body("texto").notEmpty().withMessage("El texto es requerido"),
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const eliminarComentarioValidator =[
    validateJWT,
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]