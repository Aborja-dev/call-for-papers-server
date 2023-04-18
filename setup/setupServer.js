import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { userTypedefs  } from "../graphql/user/types.js";
import { createServer } from "http";
import express from "express";
import { userResolvers } from "../graphql/user/resolvers.js";


export const app = express()
export const httpServer = createServer(app)

export const server = new ApolloServer({
    typeDefs: [userTypedefs],
    resolvers: [userResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

