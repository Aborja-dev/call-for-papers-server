import { server } from "../../setup/setupServer"
import { mongoConnection } from "../../setup/mongo"
import mongoose from "mongoose"
import { startDB } from "../utils/startDB"
import { getAnId } from "../utils/tests_helpers"
import gql from 'graphql-tag';
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
            estimateDuration: { hour: 2 },
        }
        const query = gql`
            mutation CreateProposal($proposal: ProposalInput!) {
                createProposal(proposal: $proposal) {
                    id
                    title
                }
            }
        `
        const result = server.executeOperation({ query, variables: { proposal: newProposal } })
        const proposal = result.body.singleResult?.data.createProposal
        expect(proposal.id).toBeDefined()
        expect(proposal).toHaveProperty('title', newProposal.title)
    })
})