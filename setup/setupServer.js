import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http'
import express from 'express'
import { userResolvers } from '../graphql/user/resolvers.js'
import { proposalResolvers } from '../graphql/proposal/resolvers.js'
import { rootResolvers, typeDefs } from '../graphql/schema.js'

export const app = express()
export const httpServer = createServer(app)

export const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, proposalResolvers, rootResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})
