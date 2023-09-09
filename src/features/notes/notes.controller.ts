import type { Request, Response } from 'express'
import * as notesServices from './notes.service'

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id

    const notes = await notesServices.getNotes(userId)

    return res.status(200).json({ success: true, data: notes })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const createNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id
    const { title, description, date } = req.body

    const newNote = await notesServices.createNote({ userId, title, description, date })

    return res.status(200).json({ success: true, data: newNote })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const getNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id
    const noteId = req.params.id

    const note = await notesServices.getNote(userId, noteId)

    return res.status(200).json({ success: true, data: note })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const updateNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id
    const noteId = req.params.id
    const { title, description, date } = req.body

    const noteUpdated = await notesServices.updateNote({ userId, noteId, title, description, date })

    return res.status(200).json({ success: true, data: noteUpdated })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id
    const noteId = req.params.id

    const deletedNote = await notesServices.deleteNote(userId, noteId)

    return res.status(200).json({ success: true, data: { deletedNote, message: 'note deleted' } })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}
