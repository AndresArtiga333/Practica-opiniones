import bcrypt from 'bcrypt';
import Usuario from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) =>{
    try{
        const data = req.body;
        const saltos = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(data.contra, saltos)
        data.contra = encryptedPassword

        const user = await Usuario.create(data)

        return res.status(201).json({
            message: "El usuario ha sido registrado",
            nombre: user.nombre,
            correo: user.correo
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al registrarte",
            error: err.message
        })
    }
}