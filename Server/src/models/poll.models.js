import mongoose, { Schema } from "mongoose";

const pollSchema = new Schema({
    title: { type: String, required: true },
    options: [{ option: String , votes: { type: Number, default: 0 } }],
    semester: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  }, { timestamps: true });

export const Poll = mongoose.model('Poll', pollSchema)