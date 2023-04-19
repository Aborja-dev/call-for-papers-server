/*
type Mutation {
    createProposal(proposal: ProposalInput): Proposal
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

*/
import { Proposal } from "../../models/TalkProposal.js"
import { v4 as uuidv4 } from "uuid";

const createProposal = async (_, {proposal}, ) => {
  const {userId, title, topic, estimateDuration } = proposal
    const proposalInfo = {
      proponent: userId,
      title,
      topic,
      status: 'ENVIADA',
      estimateDuration: estimateDuration.hour,
      uniqueCode: uuidv4().toString()
    }
    try {
      const newProposal = new Proposal(proposalInfo)
      const proposalSaved = await newProposal.save()
      const populatedProposal = await proposalSaved.populate('proponent', {id: true, name: true})
      return populatedProposal
    } catch (error) {
      throw new GraphQLError('request invalid', {
        extensions: { code: 'REQUEST_INVALID', extensions: { error },
      }})
    }
}

export const proposalResolvers = {
  Mutation: {
    createProposal
  }
}