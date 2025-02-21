import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: User's name
 *               correo:
 *                 type: string
 *                 description: User's email
 *               username:
 *                 type: string
 *                 description: User's username
 *               contra:
 *                 type: string
 *                 description: User's password
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: User's profile picture
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: User's email
 *               username:
 *                 type: string
 *                 description: User's username
 *               contra:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginValidator, login)

export default router