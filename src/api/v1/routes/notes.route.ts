import { Router } from 'express'
import { createNote, deleteNote, getNote, getNotes, updateNote } from 'src/features/notes/notes.controller'
import { verifyToken } from '../middlewares/verifyToken'
import { validateSchema } from '../middlewares/validator'
import { createNoteSchema, getNoteSchema, updateNoteSchema, deleteNoteSchema } from '../schemas/notes.schema'

const route = Router()

export default (app: Router): void => {
  app.use('/notes', route)

  route.get('/', verifyToken, getNotes)

  route.post('/', validateSchema(createNoteSchema), verifyToken, createNote)

  route.get('/:id', validateSchema(getNoteSchema), verifyToken, getNote)

  route.put('/:id', validateSchema(updateNoteSchema), verifyToken, updateNote)

  route.delete('/:id', validateSchema(deleteNoteSchema), verifyToken, deleteNote)
}
