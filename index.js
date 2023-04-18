import { server } from "./setup/setupServer.js";
import { startStandaloneServer } from '@apollo/server/standalone';

startStandaloneServer(server).then(({ url }) => {
    console.log(`Server ready at ${url}`);
})
