import request from 'supertest'
import { httpServer } from '../../setup/setupServer'
import { startServer } from '../..'
const serverUrl = 'http://localhost:4000'

describe('api request', () => {
  beforeAll(async () => {
    await startServer()
  })
  afterAll(async () => {
    await httpServer.close()
  })
  test('should return 200', async () => {
    const query = `
            query GetAllUsers {
                getUsers {
                    name
                }
            }`
    const response = await request(serverUrl)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({ query })
    expect(response).toBe(true)
  })
})
