import { Schema, model } from "mongoose";
 
const publicacionesSchema = Schema({
    titulo:{
        type: String,
        required: [true, "El titulo es requerido"],
        maxLength: [15, "El titulo no puede pasar de 15 caracteres"]
    },
    categoria:{
        type: Schema.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    texto:{
        type: String,
        required: [true, "El texto es necesario"],
        maxLength: [100, "El texto no puede pasar los 100 caracteres"]
    },
    status:{
        type: Boolean,
        default: true
    },
    comentarios:[{
        type: Schema.ObjectId,
        ref: 'Comentarios'
    }],
    usuario:{
        type: Schema.ObjectId,
        ref: 'Usuarios',
        required: true
    },
})

export default model("Publicaciones", publicacionesSchema)