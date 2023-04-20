import { server } from '../../setup/setupServer'
import { mongoConnection } from '../../setup/mongo'
import mongoose from 'mongoose'
import { users } from '../../mocks/users'
import { startDB } from '../utils/startDB'
import { getAnId, getAndMap } from '../utils/tests_helpers'
import { User } from '../../models/User'
import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS } from '../graphql/userQueries'

describe('users_resolvers', () => {
  beforeAll(async () => {
    await mongoConnection
    await server.start()
  })

  beforeEach(async () => {
    await startDB()
  })

  test('should get users', async () => {
    const result = await server.executeOperation({ query: GET_USERS })
    expect(result.body.singleResult.data.getUsers).toHaveLength(users.length)
  })

  test('should find user', async () => {
    const username = users[0].username
    const result = await server.executeOperation({ query: GET_USER, variables: { username } })
    expect(result.body.singleResult.data.getUser).toHaveProperty('username', username)
  })

  test('create a user', async () => {
    const variables = {
      username: 'aabo1233',
      password: 'hola123',
      email: 'abraham@email.com',
      name: 'Abraham'
    }
    const result = await server.executeOperation({ query: CREATE_USER, variables: { ...variables } })
    expect(result.body.singleResult.data.createUser.id).toBeDefined()
  })

  test('should delete a user', async () => {
    const userId = await getAnId()
    await server.executeOperation({ query: DELETE_USER, variables: { userId } })
    const idArray = await getAndMap({ model: User, property: 'id' })
    expect(idArray).not.toContain(userId)
  })

  afterAll(async () => {
    await server.stop()
    await mongoose.connection.close()
  })
})
