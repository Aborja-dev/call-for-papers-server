import { GraphQLError } from 'graphql'
import { Proposal } from '../../models/TalkProposal.js'
import { v4 as uuidv4 } from 'uuid'
import { allowRole, convertToADate, createQuery, verifyAuth } from '../../js/helpers.js'

const createProposal = async (_, { proposal }, context, info) => {
  if (!verifyAuth(context)) {
    throw new GraphQLError('acceso invalid', {
      extensions: { code: 'UNATHORIZED', extensions: { attributes: 'password' } }
    })
  }
  if (!allowRole(context, info)) {
    throw new GraphQLError('no tienes los accesos necesarios', {
      extensions: { code: 'PERMISSION ROLE', extensions: { attributes: 'password' } }
    })
  }
  const { userId, title, topic, estimateDuration } = proposal
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
    const populatedProposal = await proposalSaved.populate('proponent', { id: true, name: true })
    return populatedProposal
  } catch (error) {
    throw new GraphQLError('request invalid', {
      extensions: { code: 'REQUEST_INVALID', extensions: { error } }
    })
  }
}

const deleteProposal = async (_, { id }, context, info) => {
  if (!verifyAuth(context)) {
    throw new GraphQLError('acceso invalid', {
      extensions: { code: 'UNATHORIZED', extensions: { attributes: 'password' } }
    })
  }
  if (!allowRole(context, info)) {
    throw new GraphQLError('no tienes los accesos necesarios', {
      extensions: { code: 'PERMISSION ROLE', extensions: { attributes: 'password' } }
    })
  }
  try {
    const proposal = await Proposal.findByIdAndDelete(id)
    return proposal
  } catch (error) {
    throw new GraphQLError('request invalid', {
      extensions: { code: 'REQUEST_INVALID', extensions: { error } }
    })
  }
}

const updateProposal = async (_, { id, topic, estimateDuration, status, streamed }, context, info) => {
  if (!verifyAuth(context)) {
    throw new GraphQLError('acceso invalid', {
      extensions: { code: 'UNATHORIZED', extensions: { attributes: 'password' } }
    })
  }
  if (!allowRole(context, info)) {
    throw new GraphQLError('no tienes los accesos necesarios', {
      extensions: { code: 'PERMISSION ROLE', extensions: { attributes: 'password' } }
    })
  }
  const query = createQuery({ topic, estimateDuration, status, streamed })
  try {
    const updatedProposal = await Proposal.findOneAndUpdate(id, query, { new: true })
    return updatedProposal
  } catch (error) {
    throw new GraphQLError('request invalid', {
      extensions: { code: 'REQUEST_INVALID', extensions: { error } }
    })
  }
}
export const proposalResolvers = {
  Mutation: {
    createProposal,
    deleteProposal,
    updateProposal
  }
}
