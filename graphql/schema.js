import gql from 'graphql-tag'
import { proposalTypeDefs } from './proposal/typedefs.js'
import { userTypedefs } from './user/types.js'

const rootTypeDefs = gql`

type Date {
    year: Int
    month: Int
    day: Int
}

input DateInput {
    year: Int
    month: Int
    day: Int
}
`
export const typeDefs = [rootTypeDefs, proposalTypeDefs, userTypedefs]