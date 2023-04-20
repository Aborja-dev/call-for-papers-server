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

const convertToADate = (time) => new Date("1970-01-01T" + time);

const createProposal = async (_, {proposal}, context ) => {
  const {userId, title, topic, estimateDuration } = proposal
  console.log(context)
    const proposalInfo = {
      proponent: userId,
      title,
      topic,
      status: 'ENVIADA',
      estimateDuration: convertToADate(estimateDuration),
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

const deleteProposal = async (_, {id}) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(id)
    return proposal
  } catch (error) {
    throw new GraphQLError('request invalid', {
      extensions: { code: 'REQUEST_INVALID', extensions: { error },
    }})
  }
}

export const proposalResolvers = {
  Mutation: {
    createProposal,
    deleteProposal
  }
}