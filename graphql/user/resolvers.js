import { User } from "../../models/User.js"
import { GraphQLError } from "graphql"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../../types/const.d.js"
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

const validatePassword = (password) => passwordRegex.test(password)

const createUser = async (_, {username, password, email, name, type}) => {
    if (validatePassword(password) === false) {
        throw new GraphQLError('la contraseña es demasiado insegura', {
            extensions: { code: 'USER_INVALID', extensions: {attributes: 'password' },
          }})
    } 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const userType = USER_TYPES[type] || 'HABLANTE'
    const newUser = new User({
        username, 
        passwordHash, 
        email, 
        name, 
        type: userType 
    })
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

const loginError = (error)=>{
    throw new GraphQLError('usuario o contraseña incorrectos', {
        extensions: { code: 'BAD_LOGIN_REQUEST', extensions: { error: error },
      }})
}

const login = async (_, {username, password})=> {
    try {
         //buscar username
    const user = await User.findOne({username})
    if (!user) {
        loginError('usernameError')
    }
    // validar password
    const passwordValidated = bcrypt.compareSync(password, user.passwordHash)
    if (!passwordValidated) {
        loginError('passwordError')
    }
    // generar token
    const userForToken = {
        userId: user.id,
        type: user.type
    }
    const token = await jwt.sign(userForToken, SECRET)
    // retornar token
    return {
        role: user.type,
        token
    }   
    } catch (error) {
        loginError(error)
    }
}

export const userResolvers = {
    Query: {
        getUser,
        getUsers,
        login
    },
    Mutation: {
        createUser,   
        deleteUser
    }
}