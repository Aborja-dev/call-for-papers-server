import { users } from "../../mocks/users.js"

const getUser = (_, {username}) => users[0]

const getUsers = () => users

const createUser = (_, {username, password, email, name}) => users[0]

const deleteUser = (_, {userID}) => 'User deleted'

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