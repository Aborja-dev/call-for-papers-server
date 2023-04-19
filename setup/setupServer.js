import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { userResolvers } from "../graphql/user/resolvers.js";
import { proposalResolvers } from "../graphql/proposal/resolvers.js";
import { typeDefs } from "../graphql/schema.js";


export const app = express()
export const httpServer = createServer(app)

export const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: [userResolvers, proposalResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

