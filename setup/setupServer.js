import { ApolloServer } from "@apollo/server";
import { userTypedefs  } from "../graphql/user/types.js";
import { userResolvers } from "../graphql/user/resolvers.js";

export const server = new ApolloServer({
    typeDefs: [userTypedefs],
    resolvers: [userResolvers],
})

