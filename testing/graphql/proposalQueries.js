import gql from 'graphql-tag';

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