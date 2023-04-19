import { mongoConnection } from './setup/mongo.js';
import bodyParser from 'body-parser';
import cors from "cors";
import { app, httpServer, server } from "./setup/setupServer.js";
import { expressMiddleware } from '@apollo/server/express4';
import { PORT } from './types/const.d.js';

const runServer = async (port)=>{
    await new Promise((resolve) => httpServer.listen({ port }, resolve))
}

mongoConnection

export const startServer = async () => {
    await server.start()
    app.use(
        '/',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({context: req.context})
        }),
    )
    await runServer(PORT || 4000)
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
}
if (process.env.NODE_ENV === 'development') {
    startServer()
}


