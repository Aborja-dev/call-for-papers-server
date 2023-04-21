import { server } from '../../setup/setupServer'
import { mongoConnection } from '../../setup/mongo'
import mongoose from 'mongoose'
import { startDB } from '../utils/startDB'

describe('event tests', () => {
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
})
