import { Router } from "express";
import { agregarComentario, editarComentario, eliminarComentario } from "./comentarios.controller.js";
import { agregarComentarioValidator, actualizarComentarioValidator, eliminarComentarioValidator } from "../middlewares/comentarios-validator.js";

const router = Router()

/**
 * @swagger
 * /agregarComentario/{pid}:
 *   post:
 *     summary: Add a new comment to a publication
 *     tags: [Comentarios]
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
 *               texto:
 *                 type: string
 *                 description: Comment text
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */
router.post("/agregarComentario/:pid", agregarComentarioValidator, agregarComentario)

/**
 * @swagger
 * /actualizarComentario/{cid}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Comment text
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.patch("/actualizarComentario/:cid", actualizarComentarioValidator, editarComentario)

/**
 * @swagger
 * /eliminarComentario/{cid}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/eliminarComentario/:cid", eliminarComentarioValidator, eliminarComentario)

export default router;