import gql from 'graphql-tag'

export const userTypedefs = gql`
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
type Token {
    role: userTypes!
    token: String!
}
    type Query {
        getUser(username: String!): User
        getUsers: [User]
        login(username: String, password: String): Token
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