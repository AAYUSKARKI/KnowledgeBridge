import mongoose, { Schema } from 'mongoose'

const gallerySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
}, { timestamps: true });

export const Gallery = mongoose.model('Gallery', gallerySchema)