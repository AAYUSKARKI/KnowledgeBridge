import mongoose, { Schema } from 'mongoose'

const communitySchema = new Schema({
    name: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });

export const Community = mongoose.model('Community', communitySchema)