import { server } from '../../setup/setupServer'
import { mongoConnection } from '../../setup/mongo'
import mongoose from 'mongoose'
import { startDB } from '../utils/startDB'
import { getResult } from '../utils/tests_helpers'
import { LOGIN } from '../graphql/userQueries'
import { users } from '../../mocks/users'

describe('login tests', () => {
  beforeAll(async () => {
    await mongoConnection
    await server.start(4000)
  })
  beforeEach(async () => {
    await startDB()
  })
  afterAll(async () => {
    await server.stop()
    await mongoose.connection.close()
  })

  test('should return a token', async () => {
    const user = users[0]
    const variables = {
      username: user.username,
      password: user.password
    }
    const response = await server.executeOperation({ query: LOGIN, variables })
    const result = getResult(response, 'login')
    expect(result.token).toBeDefined()
    expect(result.role).toBeDefined()
    expect(result.token.length).toBeGreaterThan(0)
  })
})
