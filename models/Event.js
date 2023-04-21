import mongoose from 'mongoose'

const EVENT_TYPE_ENUM = ['PRESENCIAL', 'VIRTUAL', 'HIBRIDO']
const EVENT_STATUS_ENUM = ['BORRADOR', 'EN_CURSO', 'FINALIZADO']

const eventSchema = mongoose.Schema({
  name: mongoose.SchemaTypes.String,
  type: {
    type: mongoose.SchemaTypes.String,
    enum: EVENT_TYPE_ENUM
  },
  description: mongoose.SchemaTypes.String,
  talks: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Proposal'
  }],
  startingDate: mongoose.SchemaTypes.Date,
  endingDate: mongoose.SchemaTypes.Date,
  bannerUrl: mongoose.SchemaTypes.String,
  url: mongoose.SchemaTypes.String,
  location: mongoose.SchemaTypes.String,
  organizers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ],
  status: {
    type: mongoose.SchemaTypes.String,
    enum: EVENT_STATUS_ENUM
  },
  proposalStartingDate: mongoose.SchemaTypes.Date,
  proposalEndingDate: mongoose.SchemaTypes.Date,
  timezone: mongoose.SchemaTypes.String
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Event = mongoose.model('event', eventSchema)

export default Event
