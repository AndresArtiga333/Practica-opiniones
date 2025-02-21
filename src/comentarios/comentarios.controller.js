import Comentarios from "./comentarios.model.js"
import Publicaciones from "../publicaciones/publicaciones.model.js"

export const agregarComentario = async (req, res) =>{
    try{
        const {usuario} = req;
        const {pid} = req.params;
        const {texto} = req.body;

        const publicacion = await Publicaciones.findById(pid);
        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        };
        const nuevoComentario = new Comentarios({
            texto,
            usuario: usuario._id
        });
        const comentarioGuardado = await nuevoComentario.save();

        publicacion.comentarios.push(comentarioGuardado._id);
        await publicacion.save();

        await publicacion.populate({
            path: "comentarios", 
            select: "texto -_id", 
            populate: {
                path: "usuario", 
                select: "username -_id"
            }
        })

        return res.status(201).json({
            success: true,
            message: "Comentario agregado correctamente",
            publicacion
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
}