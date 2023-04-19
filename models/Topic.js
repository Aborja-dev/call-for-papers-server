import mongoose from "mongoose";

const topicSchema = mongoose.Schema({
    name: mongoose.SchemaTypes.String
})

topicSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Topic = mongoose.model('topic', topicSchema)

export default Topic