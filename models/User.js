import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    passwordHash: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    name: mongoose.SchemaTypes.String
})

userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const User = mongoose.model('User', userSchema)