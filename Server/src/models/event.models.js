import mongoose, { Schema } from 'mongoose'

const eventScheduleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: true });

  export const Event = mongoose.model('Event', eventScheduleSchema)