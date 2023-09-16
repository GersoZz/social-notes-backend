import { Router } from 'express'
import { signUp, signIn, logOut, verifyToken } from 'src/features/auth/auth.controller'
import { verifyToken as verifyTokenMiddl } from '../middlewares/verifyToken'
import { validateSchema } from '../middlewares/validator'
import { signUpSchema, signInSchema } from '../schemas/auth.schema'

const route = Router()

export default (app: Router): void => {
  app.use('/auth', route)

  route.post('/signup', validateSchema(signUpSchema), signUp)

  route.post('/signin', validateSchema(signInSchema), signIn)

  route.post('/verify', verifyToken)

  route.post('/logout', verifyTokenMiddl, logOut)
}
