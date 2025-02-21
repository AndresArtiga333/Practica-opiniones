import { Router } from "express";
import { actualizarUsuario, actualizarContraseña } from "./user.controller.js";
import { actualizarUsuarioValidator, actualizarContraValidator } from "../middlewares/user-validator.js";

const router = Router()

/**
 * @swagger
 * /actualizarUsuario:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/actualizarUsuario", actualizarUsuarioValidator, actualizarUsuario);

/**
 * @swagger
 * /actualizarContra:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contraAntigua:
 *                 type: string
 *                 description: Old password
 *               contraNueva:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/actualizarContra", actualizarContraValidator, actualizarContraseña)

export default router;