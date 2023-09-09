import type { Types } from 'mongoose'

interface userNotes {
  userNote: Types.ObjectId
  username: string
  email: string
}

export interface INote {
  title: string
  description: string
  user: userNotes
  date: Date
}

export interface createNoteInput {
  userId: string
  title: string
  description: string
  date: Date
}

export interface updateNoteInput {
  userId: string
  noteId: string
  title: string
  description: string
  date: Date
}
