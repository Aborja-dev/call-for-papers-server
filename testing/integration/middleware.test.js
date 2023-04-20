/* eslint-disable no-use-before-define */
import mongoose from 'mongoose'
import request from 'supertest'
import { mongoConnection } from '../../setup/mongo'
import { httpServer } from '../../setup/setupServer'
import { startServer } from '../..'
import { loginForTest } from '../utils/tests_helpers'
import { users } from '../../mocks/users'
import { GETCONTEXT, authSpeakerContext } from '../graphql/contexts'
import { startDB } from '../utils/startDB'
const serverUrl = 'http://localhost:4000'
describe('tests for middleware', () => {
  // eslint-disable-next-line no-unused-vars
  let token = ''
  beforeAll(async () => {
    await mongoConnection
    await startServer()
  })
  beforeEach(async () => {
    await startDB()
    token = await loginForTest(users[1].username)
  })

  afterAll(async () => {
    await httpServer.close()
    await mongoose.connection.close()
  })
  test('should retrun a auth context', async () => {
    const contextResult = await request(serverUrl)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ query: GETCONTEXT })
    const { context } = authSpeakerContext()
    const { token } = token
    expect(contextResult).toHaveProperty('auth')
    expect(contextResult).toEqual(context)
  })
})
