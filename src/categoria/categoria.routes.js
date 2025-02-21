import { Router } from "express";
import { agregarCategoria, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { agregarCategoriaValidator, editarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

/**
 * @swagger
 * /agregarCategoria:
 *   post:
 *     summary: Add a new category
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Category name
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/agregarCategoria", agregarCategoriaValidator, agregarCategoria)

/**
 * @swagger
 * /editarCategoria/{caid}:
 *   patch:
 *     summary: Edit an existing category
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: caid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Category name
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.patch("/editarCategoria/:caid", editarCategoriaValidator, editarCategoria)

/**
 * @swagger
 * /eliminarCategoria/{caid}:
 *   delete:
 *     summary: Delete an existing category
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: caid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/eliminarCategoria/:caid", eliminarCategoriaValidator, eliminarCategoria)

export default router