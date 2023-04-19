import gql from 'graphql-tag';

export const proposalTypeDefs = gql`

enum ProposalStatus {
    ENVIADA
    ESPERA
    PRESELECCION
    APROBADA
    RECHAZADA
}

type Topic {
    id: ID!
    topic: String!
}

type Proposal {
    id: ID!
    proponent: User!
    title: String!
    topic: String!
    abstract: String,
    estimateDuration: Hour!,
    status: ProposalStatus!,
    attachments: [String]
    streamed: Boolean
    uniqueCode: ID!
}

input ProposalInput {
    userId: ID!
    title: String!
    topic: String!
    abstract: String,
    estimateDuration: HourInput!,
    attachments: [String]
    streamed: Boolean
}

type Mutation {
    createProposal(proposal: ProposalInput): Proposal
}

`