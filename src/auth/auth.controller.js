import bcrypt from 'bcrypt';
import Usuario from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res, next) =>{
    try{
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const saltos = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(data.contra, saltos)
        data.contra = encryptedPassword
        data.profilePicture = profilePicture

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

export const login = async (req, res) => {
    const { correo, username, contra } = req.body
    try{
        const user = await Usuario.findOne({
            $or:[{correo: correo}, {username: username}]
        })
        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const contraseñaValida = await bcrypt.compare(contra, user.contra);
        if (!contraseñaValida) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }
        const token = await generateJWT(user._id)

        return res.status(200).json({
            message: "Inicio de sesión correctamente",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Inicio de sesion fallido",
            error: err.message
        })
    }
}