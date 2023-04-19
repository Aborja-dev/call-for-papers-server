import { server } from "../../setup/setupServer"
import { mongoConnection } from "../../setup/mongo"
import mongoose from "mongoose"
import { startDB } from "../utils/startDB"
import { getAll, getAnId, getAnIdFromModel } from "../utils/tests_helpers"
import gql from 'graphql-tag';
import { Proposal } from "../../models/TalkProposal"
describe('proposal tests', () => {
    beforeAll(async () => {
        await mongoConnection
        await server.start()
    })
    beforeEach(async () => {
        await startDB()
    })
    afterAll(async () => {
        await server.stop()
        await mongoose.connection.close()
    })
    test('create a proposal', async () => {
        const userId = await getAnId()
        const newProposal = {
            userId,
            title: 'el mundo de la arqueologia',
            topic: 'arqueologia',
            estimateDuration: '02:30',
        }
        const query = gql`
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
        const result = await server.executeOperation({ query, variables: { proposal: newProposal } })
        const proposal = result.body.singleResult.data.createProposal || null
        expect(proposal.id).toBeDefined()
        expect(proposal).toHaveProperty('title', newProposal.title)
    })
    test('should delete a proposal', async () => {
        const idToDelete = await getAnIdFromModel(Proposal)
        const query = gql`
            mutation DeleteProposal($id: ID!) {
                deleteProposal(id: $id)
            }
        `
        await server.executeOperation({ query, variables: { id: idToDelete } })
        const proposals = await getAll(Proposal)
        const proposalsId = proposals.map(p => p.id)
        expect(proposalsId).not.toContain(idToDelete)
    })
})