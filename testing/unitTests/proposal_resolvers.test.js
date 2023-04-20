import { server } from "../../setup/setupServer"
import { mongoConnection } from "../../setup/mongo"
import mongoose from "mongoose"
import { startDB } from "../utils/startDB"
import { getAll, getAnIdFromModel } from "../utils/tests_helpers";
import { Proposal } from "../../models/TalkProposal"
import { CREATE_PROPOSAL, DELETE_PROPOSAL } from "../graphql/proposalQueries"
import { authSpeakerContext } from "../graphql/contexts"
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
        const context = await authSpeakerContext()
        const {userId} = context.contextValue.auth
        const newProposal = {
            userId,
            title: 'el mundo de la arqueologia',
            topic: 'arqueologia',
            estimateDuration: '02:30',
        }
        const result = await server.executeOperation({ 
            query: CREATE_PROPOSAL, 
            variables: { proposal: newProposal },
        }, context)
        const proposal = result.body.singleResult.data.createProposal || null
        expect(proposal.id).toBeDefined()
        expect(proposal).toHaveProperty('title', newProposal.title)
    })
    test('should delete a proposal', async () => {
        const idToDelete = await getAnIdFromModel(Proposal)
        await server.executeOperation({ query: DELETE_PROPOSAL, variables: { id: idToDelete } })
        const proposals = await getAll(Proposal)
        const proposalsId = proposals.map(p => p.id)
        expect(proposalsId).not.toContain(idToDelete)
    })
})