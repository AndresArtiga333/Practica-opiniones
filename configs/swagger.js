import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            titulo: "Gestor de opiniones API",
            version: "1.0.0",
            descripcion: "Api para gestionar opiniones ",
            contacto:{
                nombre: "Andres Artiga",
                correo: "aartiga-2020246@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestionOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/publicaciones/publicaciones.routes.js",
        "./src/comentarios/comentarios.routes.js",
        "./src/categoria/categoria.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export {swaggerDocs, swaggerUi}