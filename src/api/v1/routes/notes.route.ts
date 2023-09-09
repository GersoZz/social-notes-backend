import { Router } from 'express'
import { createNote, deleteNote, getNote, getNotes, updateNote } from 'src/features/notes/notes.controller'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

export default (app: Router): void => {
  app.use('/notes', route)

  route.get('/', verifyToken, getNotes)

  route.post('/', verifyToken, createNote)

  route.get('/:id', verifyToken, getNote)

  route.put('/:id', verifyToken, updateNote)

  route.delete('/:id', verifyToken, deleteNote)
}
