import { Schema, model } from "mongoose";

const userSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no puede pasar los 25 caracteres"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "El apellido no puede pasar los 25 caracteres"]
    },
    username:{
        type: String,
        required: [true, "El username es requerido"],
        maxLength: [12, "El username no puede pasar los 12 caracteres"]
    },
    correo:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    contra:{
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    rol:{
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT"],
        default: "CLIENT"
    },
    status:{
        type: Boolean,
        default: true
    },
    profilePicture:{
        type: String
    }
})

userSchema.methods.toJSON = function(){
    const {contra, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)