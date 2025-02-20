import Publicaciones from "./publicaciones.model.js"
import Usuarios from "../user/user.model.js"

export const agregarPublicacion = async (req, res) =>{
    try{
        const {usuario} = req;

        const {titulo, categoria, texto} = req.body;

        const nuevaPublicacion = new Publicaciones({
            titulo,
            categoria,
            texto,
            usuario: usuario._id 
        });

        const guardarPublicacion = await nuevaPublicacion.save();

        return res.status(201).json({
            success: true,
            message: "Publicación creada correctamente",
            publicacion: guardarPublicacion
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: err.message
        })
    }
}

export const actualizarPublicacion = async (req, res) =>{
    try{
        const {usuario} = req;
        const {pid} = req.params;
        const data = req.body;
        
        const publicacion = await Publicaciones.findById(pid);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        }
        if (!publicacion.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar esta publicación"
            });
        }
        const publicacionActualizada = await Publicaciones.findOneAndUpdate(
            {_id: pid}, {$set: data}, { new: true }
           );
           return res.status(200).json({
               success: true,
               message: "Publicacion actualizada correctamente",
               publicacionActualizada
           });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicacion",
            error: err.message
        })
    }
}

export const eliminarPublicacion = async (req, res) =>{
    try{
        const {usuario} = req;
        const {pid} = req.params;

        const publicacion = await Publicaciones.findById(pid);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "La publicación no existe"
            });
        };
        if (!publicacion.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar esta publicación"
            });
        };

        await Publicaciones.findByIdAndDelete(pid);

        return res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente"
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicacion",
            error: err.message
        })
    }
}