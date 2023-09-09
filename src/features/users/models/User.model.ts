import { Schema, model } from 'mongoose'
import { type IUser } from '../interfaces/User.interface'

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String }
  },
  {
    timestamps: true
  }
)

export default model('User', UserSchema)
