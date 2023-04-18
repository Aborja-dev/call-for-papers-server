import mongoose from "mongoose";
import muv from 'mongoose-unique-validator'
const USER_TYPES_ENUM = ['ADMINISTRADOR', 'ORGANIZADOR', 'HABLANTE', 'USUARIO']
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


const userSchema = mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
        minlength: 4
        
    },
    passwordHash: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: {
            validator: function(value) {
                emailRegex.test(value);
            },
            message: props => `${props.value} no es un correo valido`
          }
    },
    name: {
        type: mongoose.SchemaTypes.String,
    },
    type: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: USER_TYPES_ENUM,
    }
})

userSchema.plugin(muv)

userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const User = mongoose.model('User', userSchema)