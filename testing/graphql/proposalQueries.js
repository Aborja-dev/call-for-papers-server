import gql from 'graphql-tag'

export const CREATE_PROPOSAL = gql`
mutation CreateProposal($proposal: ProposalInput!) {
    createProposal(proposal: $proposal) {
        proponent {
            id
            name
        }
        id
        title
    }
}
`
export const DELETE_PROPOSAL = gql`
 mutation DeleteProposal($id: ID!) {
    deleteProposal(id: $id) 
 }
`

export const UPDATE_PROPOSAL = gql`
 mutation UpdateProposal(
    $id: ID!, 
    $topic: String, 
    $estimateDuration: String, 
    $status:ProposalStatus, 
    $streamed: Boolean
    ) {
        updateProposal(
            id: $id,
            topic: $topic,
            estimateDuration: $estimateDuration,
            status: $status,
            streamed: $streamed
        ) {
            id
            title
            status
            topic
            estimateDuration    
        }
 }
`
