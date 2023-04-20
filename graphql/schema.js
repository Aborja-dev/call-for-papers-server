import gql from 'graphql-tag'
import { proposalTypeDefs } from './proposal/typedefs.js'
import { userTypedefs } from './user/types.js'

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
}
`

const pruebas = (_, __, context) => {
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
