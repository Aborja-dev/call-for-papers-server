const typeUser = `.
    type User {
        username: String!
        passwordHash: String!
        email: String!
        name: String!
    }
`

export const userTypedefs = `
type User {
    username: String!
    passwordHash: String!
    email: String!
    name: String!
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
            name: String!
        ): User
    
        deleteUser(username: String!): String
    }
`