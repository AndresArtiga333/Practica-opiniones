import bcrypt from "bcrypt"
import Usuarios from "../user/user.model.js"

export const actualizarUsuario = async (req, res) =>{
    try{
        const {usuario} = req;
        const data = req.body;
        
        const usuarioActualizado = await Usuarios.findOneAndUpdate(
            usuario, {$set: data}, { new: true }
           );
   
           if (!usuarioActualizado) {
               return res.status(403).json({
                   success: false,
                   message: "No se puede editar a los administradores o el usuario no existe"
               });
           }
           return res.status(200).json({
               success: true,
               message: "Usuario actualizado correctamente",
               usuarioActualizado
           });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: err.message
        })
    }
}

export const actualizarContraseña = async (req, res) =>{
    try{
        const {usuario} = req;
        const {contraAntigua, contraNueva} = req.body;

        const user = await Usuarios.findById(usuario._id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        const igual = await bcrypt.compare(contraAntigua, user.contra);

        if (!igual) {
            return res.status(400).json({
                success: false,
                message: "La contraseña antigua no es correcta"
            });
        }
        user.contra = contraNueva;
        const saltos = await bcrypt.genSalt(10);
        const hashedContra = await bcrypt.hash(contraNueva, saltos);

        user.contra = hashedContra;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente"
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: err.message
        })
    }
}