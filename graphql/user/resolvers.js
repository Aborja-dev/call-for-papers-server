import { usersWithHash, users } from "../../mocks/users.js"
import { User } from "../../models/User.js"
import bcrypt from 'bcrypt'

const getUser = async (_, {username}) => {
    const user = await User.findOne({username})
    return user
}

const getUsers = async () => {
    const users = await User.find({})
    return users
}

const createUser = async (_, {username, password, email, name}) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({username, passwordHash, email, name})
    await newUser.save()
    return newUser
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