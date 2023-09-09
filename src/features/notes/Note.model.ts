import { Schema, model, Types } from 'mongoose'
import type { INote } from './Note.interface'

const userSchema = new Schema(
  {
    userNote: { type: Types.ObjectId },
    username: { type: String },
    email: { type: String }
  },
  {
    _id: false
  }
)

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: userSchema }
  },
  {
    timestamps: true
  }
)

export default model('Note', noteSchema)
