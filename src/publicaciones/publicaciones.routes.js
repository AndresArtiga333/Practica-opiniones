import { Router } from "express";
import { agregarPublicacion, actualizarPublicacion, eliminarPublicacion } from "./publicaciones.controller.js";
import { agregarPublicacionValidator, actualizarYEliminarPublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router()

/**
 * @swagger
 * /agregarPublicacion:
 *   post:
 *     summary: Add a new publication
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Publication title
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *               texto:
 *                 type: string
 *                 description: Publication text
 *     responses:
 *       201:
 *         description: Publication created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/agregarPublicacion", agregarPublicacionValidator, agregarPublicacion)

/**
 * @swagger
 * /actualizarPublicacion/{pid}:
 *   put:
 *     summary: Update an existing publication
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Publication title
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *               texto:
 *                 type: string
 *                 description: Publication text
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */
router.put("/actualizarPublicacion/:pid", actualizarYEliminarPublicacionValidator, actualizarPublicacion)

/**
 * @swagger
 * /eliminarPublicacion/{pid}:
 *   delete:
 *     summary: Delete an existing publication
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */
router.delete("/eliminarPublicacion/:pid", actualizarYEliminarPublicacionValidator, eliminarPublicacion)

export default router