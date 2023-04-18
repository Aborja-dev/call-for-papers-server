

export const userTypedefs = `
enum userTypes {
    ADMINISTRADOR
    ORGANIZADOR
    HABLANTE
    USUARIO
}

type User {
    id: ID!
    username: String!
    passwordHash: String!
    email: String!
    name: String
    type:  userTypes!
}

    type Query {
        getUser(username: String!): User
        getUsers: [User]
    }

    type Mutation {
        createUser(
            username: String!, 
            password: String!, 
            email: String!, 
            name: String!,
            type:  userTypes
        ): User
    
        deleteUser(userId: ID!): String
    }
`