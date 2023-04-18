import { usersWithHash, users } from "../../mocks/users.js"

const getUser = (_, {username}) => usersWithHash[0]

const getUsers = () => {
    return usersWithHash
}

const createUser = (_, {username, password, email, name}) => usersWithHash[0]

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