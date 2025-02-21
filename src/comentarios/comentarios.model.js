import { Schema, model } from "mongoose";

const comentariosSchema = Schema({
    texto:{
        type: String,
        required: [true, "El texto es necesario"],
        maxLength: [100, "El texto no puede pasar los 100 caracteres"]
    },
    usuario:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model("Comentarios", comentariosSchema)