import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import publicacionesRoutes from "../src/publicaciones/publicaciones.routes.js"
import comentariosRoutes from "../src/comentarios/comentarios.routes.js"
import categoriaRoutes from "../src/categoria/categoria.routes.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = async (app) =>{
    app.use("/gestionOpiniones/v1/auth", authRoutes)
    app.use("/gestionOpiniones/v1/user", userRoutes)
    app.use("/gestionOpiniones/v1/publicaciones", publicacionesRoutes)
    app.use("/gestionOpiniones/v1/comentarios", comentariosRoutes)
    app.use("/gestionOpiniones/v1/categoria", categoriaRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}