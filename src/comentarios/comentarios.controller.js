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

        return res.status(200).json({
            success: true,
            message: "Comentario agregado correctamente",
            
            publicacionConComentarios: {
                usuario: publicacion.usuario, 
                titulo: publicacion.titulo,
                texto: publicacion.texto,
                comentarios: publicacion.comentarios 
            }

        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
}

export const editarComentario = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;
        const {texto} = req.body;

        const comentario = await Comentarios.findById(cid);
        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "El comentario no existe"
            });
        }
        console.log(comentario)
        if (!comentario.usuario.equals(usuario._id)) {
            return res.status(400).json({
                success: false,
                message: "No tienes permiso para editar este comentario"
            });
        }

        comentario.texto = texto;
        const nuevoComentario = await comentario.save();


        const respuesta = {
            texto: nuevoComentario.texto,
            usuario: nuevoComentario.usuario.nombre
        };
        return res.status(200).json({
            success: true,
            message: "Comentario actualizado correctamente",
            respuesta
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el comentario",
            error: err.message
        });
    }
}

export const eliminarComentario = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;

        const comentario = await Comentarios.findById(cid);
        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "El comentario no existe"
            });
        }
        if (!comentario.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar este comentario"
            });
        }
        const publicacion = await Publicaciones.findOne({ comentarios: cid });
        if (publicacion) {
            publicacion.comentarios = publicacion.comentarios.filter(
                comentarioId => comentarioId.toString() !== cid.toString()
            );
            await publicacion.save(); 
        }

        await Comentarios.findByIdAndDelete(cid);

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente"
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message
        });
    }
}