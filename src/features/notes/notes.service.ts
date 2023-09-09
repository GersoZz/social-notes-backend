import NoteModel from './Note.model'
import UserModel from '../users/models/User.model'
import type { INote, createNoteInput, updateNoteInput } from './Note.interface'

export const getNotes = async (userId: string): Promise<INote[]> => {
  const notes = await NoteModel.find({ 'user.userNote': userId })

  return notes
}

export const createNote = async ({ userId, title, description, date }: createNoteInput): Promise<INote> => {
  const user = await UserModel.findById(userId).select({ _id: 1, username: 1, email: 1 })
  if (!user)
    throw {
      status: 400,
      message: 'user not found'
    }

  const newNote = new NoteModel({
    title,
    description,
    date,
    user: {
      userNote: user?._id,
      username: user?.username,
      email: user?.email
    }
  })
  await newNote.save()

  return newNote
}

export const getNote = async (userId: string, noteId: string): Promise<INote> => {
  const note = await NoteModel.findOne({ _id: noteId, 'user.userNote': userId })
  if (!note)
    throw {
      status: 400,
      message: 'Note not found'
    }

  return note
}

export const updateNote = async ({ userId, noteId, title, description, date }: updateNoteInput): Promise<INote> => {
  const noteUpdated = await NoteModel.findOneAndUpdate(
    { _id: noteId, 'user.userNote': userId },
    { title, description, date },
    { new: true }
  )
  if (!noteUpdated)
    throw {
      status: 400,
      message: 'Note not found'
    }

  return noteUpdated
}

export const deleteNote = async (userId: string, noteId: string): Promise<INote> => {
  const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId, 'user.userNote': userId })
  if (!deletedNote)
    throw {
      status: 400,
      message: 'Note not found'
    }

  return deletedNote
}
