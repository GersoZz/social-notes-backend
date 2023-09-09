import { Router } from 'express'
import { signUp, signIn, logOut } from 'src/features/auth/auth.controller'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

export default (app: Router): void => {
  app.use('/auth', route)

  route.post('/signup', signUp)

  route.post('/signin', signIn)

  route.post('/logout', verifyToken, logOut)
}
