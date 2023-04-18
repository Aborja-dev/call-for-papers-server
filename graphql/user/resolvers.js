import { User } from "../../models/User.js"
import bcrypt from 'bcrypt'
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z\d]{7,})$/


const USER_TYPES = {
    admin:  'ADMINISTRADOR',
    organizador: 'ORGANIZADOR',
    hablante: 'HABLANTE'
}

const getUser = async (_, {username}) => {
    const user = await User.findOne({username})
    return user
}

const getUsers = async () => {
    const users = await User.find({})
    return users
}

const validatePassword = (pasword) => passwordRegex.test(password)

const createUser = async (_, {username, password, email, name, type}) => {
    if (validatePassword(password) === false) {
        throw new GraphQLError('la contraseña es demasiado insegura', {
            extensions: { code: 'USER_INVALID', extensions: {attributes: 'password' },
          }})
    } 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const userType = USER_TYPES[type]
    const newUser = new User({
        username, 
        passwordHash, 
        email, 
        name, 
        type: userType || 'HABLANTE'})
    try {
        await newUser.save()
        return newUser
    } catch (error) {
        throw new GraphQLError('los datos ingresados son invalidos', {
            extensions: { code: 'USER_INVALID', extensions: { error },
          }})
    }
}


const deleteUser = async (_, {userId}) => {
    const user = await User.findByIdAndDelete(userId)
    return `El usuario ${user.username} fue eliminado`
}

export const userResolvers = {
    Query: {
        getUser,
        getUsers
    },
    Mutation: {
        createUser,   
        deleteUser
    }
}