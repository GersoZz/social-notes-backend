import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import config from 'src/config'
import UserModel from 'src/features/users/models/User.model'

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { token } = req.cookies
  if (!token) return res.status(400).json({ success: false, data: { message: 'token not found' } })

  jwt.verify(token, config.secretToken, async (error: any, user: any) => {
    if (error) return res.status(400).json({ success: false, data: { message: 'invalid token' } })

    const userFound = await UserModel.findById(user?.id)
    if (!userFound) return res.status(400).json({ success: false, data: { message: 'user not found' } })

    req.user = user
    next()
  })
}
