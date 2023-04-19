import mongoose from "mongoose";
import { STATUS_PROPOSAL_ENUM } from "../types/const.d.js";
import muv from 'mongoose-unique-validator'

const talkSchema = mongoose.Schema({
    proponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    topic: mongoose.Schema.Types.String,
    abstract: mongoose.Schema.Types.String,
    estimateDuration: mongoose.Schema.Types.Number,
    status: {
        type: mongoose.Schema.Types.String,
        enum: STATUS_PROPOSAL_ENUM,
        required: true
    },
    attachments: [mongoose.Schema.Types.String],
    streamed: mongoose.Schema.Types.Boolean,
    uniqueCode: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },
})

talkSchema.plugin(muv)
talkSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Proposal =  mongoose.model("proposal", talkSchema)


