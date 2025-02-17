import { body } from "express-validator";
import { correoExists, userExists, usernameExists } from "../helpers/db-validators.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validar-roles.js";
import { validarCampos } from "./validar-campos.js";

export const registerValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos,
    handleErrors
]