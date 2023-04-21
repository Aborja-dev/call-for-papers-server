import { mongoConnection } from './setup/mongo.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { app, httpServer, server } from './setup/setupServer.js'
import { expressMiddleware } from '@apollo/server/express4'
import { PORT } from './types/const.d.js'
import { authToken } from './middleware/auth.js'

const runServer = async (port) => {
  await new Promise((resolve) => httpServer.listen({ port }, resolve))
}

await mongoConnection

export const startServer = async (port = PORT) => {
  await server.start()
  app.use(
    '/',
    cors(),
    authToken,
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ context: req.context })
    })
  )
  await runServer(port)
  console.log(`🚀 Server ready at http://localhost:${port}/`)
}
if (process.env.NODE_ENV === 'development') {
  startServer(4002)
}
