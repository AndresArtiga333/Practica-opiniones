import Categoria from "./categoria.model.js"
import Publicacion from "../publicaciones/publicaciones.model.js"

export const agregarCategoria = async (req, res) =>{
    try{
        const {nombre} = req.body;

        const nuevaCategoria = new Categoria({
            nombre
        })

        const guardarCategoria = await nuevaCategoria.save();

        return res.status(201).json({
            success: true,
            message: "Categoria creada correctamente",
            publicacion: guardarCategoria
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar la categoria",
            error: err.message
        });
    }
}

export const editarCategoria = async (req, res) =>{
    try{
        const {caid} = req.params;
        const {nombre} = req.body;
        
        const categoriaActualizada = await Categoria.findOneAndUpdate(
        {_id: caid}, {nombre: nombre} , { new: true }
           );
           if (!categoriaActualizada) {
            return res.status(403).json({
                success: false,
                message: "Encontro la categoria"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Categoria actualizada",
            categoriaActualizada
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al editar la categoria",
            error: err.message
        });
    }
}

export const eliminarCategoria = async (req, res) =>{
    try{
        const {caid} = req.params;

        const categoria = await Categoria.findById(caid);
        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: "La categoría no existe"
            });
        }
        const categoriaDefault = await Categoria.findOne({ nombre: "default" });
        if (!categoriaDefault) {
            return res.status(500).json({
                success: false,
                message: "La categoría 'default' no existe"
            });
        }
        await Publicacion.updateMany(
            { categoria: caid }, 
            { categoria: categoriaDefault._id } 
        );
        await Categoria.findByIdAndDelete(caid);

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada correctamente y publicaciones actualizadas"
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        });
    }
}