/* eslint-disable no-use-before-define */
import mongoose from 'mongoose'
import request from 'supertest'
import { mongoConnection } from '../../setup/mongo'
import { httpServer } from '../../setup/setupServer'
import { loginForTest } from '../utils/tests_helpers'
import { users } from '../../mocks/users'
import { GETCONTEXT, authSpeakerContext } from '../graphql/contexts'
import { startDB } from '../utils/startDB'
import { startServer } from '../..'
const serverUrl = 'http://localhost:4000'
describe('tests for middleware', () => {
  // eslint-disable-next-line no-unused-vars
  let userToken = ''
  beforeAll(async () => {
    await mongoConnection
    await startServer(4000)
  })
  beforeEach(async () => {
    await startDB()
    userToken = await loginForTest(users[1].username)
  })

  afterAll(async () => {
    await httpServer.close()
    await mongoose.connection.close()
  })
  test('should retrun a auth context', async () => {
    const { token } = userToken
    const response = await request(serverUrl)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: GETCONTEXT })
    const { contextValue: context } = await authSpeakerContext()
    const contextResultString = response.body.data.pruebas.context
    const contextResult = JSON.parse(contextResultString)
    expect(contextResult.context).toHaveProperty('auth')
    expect(contextResult).toEqual(context)
  })
})
