import gql from 'graphql-tag'
import { proposalTypeDefs } from './proposal/typedefs.js'
import { userTypedefs } from './user/types.js'
import { allowRole, verifyAuth } from '../js/helpers.js'
import { GraphQLError } from 'graphql'
const rootTypeDefs = gql`

type Date {
    year: Int
    month: Int
    day: Int
}

type Query {
    pruebas: Prueba
}

type Prueba {
    context: String
}

input DateInput {
    year: Int
    month: Int
    day: Int
}`

const pruebas = (_, __, context, info) => {
  if (!verifyAuth(context)) {
    throw new GraphQLError('acceso invalid', {
      extensions: { code: 'UNATHORIZED', extensions: { attributes: 'password' } }
    })
  }
  if (!allowRole(context, info)) {
    throw new GraphQLError('no tienes los accesos necesarios', {
      extensions: { code: 'PERMISSION ROLE', extensions: { attributes: 'password' } }
    })
  }
  const _context = JSON.stringify(context)
  return {
    context: _context
  }
}

export const rootResolvers = {
  Query: {
    pruebas
  }
}
export const typeDefs = [rootTypeDefs, proposalTypeDefs, userTypedefs]
