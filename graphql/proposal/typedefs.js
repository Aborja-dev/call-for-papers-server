import gql from 'graphql-tag';

export const proposalTypeDefs = gql`

enum ProposalStatus {
    ENVIADA
    ESPERA
    PRESELECCION
    APROBADA
    RECHAZADA
}

type Proposal {
    id: ID!
    proponent: User!
    title: String!
    topic: String!
    abstract: String,
    estimateDuration: String!,
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
    estimateDuration: String!,
    attachments: [String]
    streamed: Boolean
}

type Mutation {
    createProposal(proposal: ProposalInput): Proposal
    deleteProposal(id: ID!): String
    updateProposal(id: ID!, topic: String, estimateDuration: String, status:ProposalStatus, streamed: Boolean ): Proposal
}

`