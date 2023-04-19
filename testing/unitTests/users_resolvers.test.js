import { server } from "../../setup/setupServer"
import { mongoConnection } from "../../setup/mongo"
import mongoose from "mongoose"
import { users } from "../../mocks/users"
import { startDB } from "../utils/startDB"
import { getAnId, getAndMap } from "../utils/tests_helpers"
import { User } from "../../models/User"

describe('users_resolvers', () => {
    beforeAll(async () => {
        await mongoConnection
        await server.start()
    })

    beforeEach(async () => {
        await startDB()
    })

    test('should get users', async () => {
        const query = `
        query GetAllUsers {
            getUsers {
                name
            }
        }
        `
        const result = await server.executeOperation({ query })
        expect(result.body.singleResult.data.getUsers).toHaveLength(users.length)
    })

    test('should find user', async () => {
        const username = users[0].username
        const query = `
        query GetUserById($username: String!) {
            getUser(username: $username) {
                username
            }
        }
        `
        const result = await server.executeOperation({ query, variables: { username } })
        expect(result.body.singleResult.data.getUser).toHaveProperty('username', username);
    })

    test('create a user', async () => {
        const variables = {
            username: 'aabo1233',
            password: 'hola123',
            email: 'abraham@email.com',
            name: 'Abraham'
        }
        const query = `
        mutation CreateNewUser(
            $username: String!
            $password: String!
            $email: String!
            $name: String!,
            $type: userTypes
            ) {
                createUser(
                    username: $username
                    password: $password
                    email: $email
                    name: $name
                    type: $type
                ) {
                    id
                    name
                    type
            }
        }
        `
        const result = await server.executeOperation({ query, variables: { ...variables } })
        expect(result.body.singleResult.data.createUser.id).toBeDefined()
    })

    test('should delete a user', async () => {
        const userId = await getAnId()
        const query = `
        mutation DeleteUserById($userId: ID!) {
            deleteUser(userId: $userId)
        }
        `

        const result = await server.executeOperation({ query, variables: { userId } })
        const idArray = await getAndMap({ model: User, property: 'id' })
        expect(idArray).not.toContain(userId)
    })

    afterAll(async () => {
        await server.stop()
        await mongoose.connection.close()
    })
})


