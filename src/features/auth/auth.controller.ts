import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from 'src/config'
import * as authServices from './auth.service'

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body

    const userRegistered = await authServices.signUp({ username, email, password })

    res.cookie('token', userRegistered.token, {
      httpOnly: config.env !== 'development',
      secure: true,
      sameSite: 'none'
    })
    return res.status(200).json({ success: true, data: userRegistered.userData })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body

    const userInfo = await authServices.signIn({ email, password })

    res.cookie('token', userInfo.token, {
      httpOnly: config.env !== 'development',
      secure: true,
      sameSite: 'none'
    })
    return res.status(200).json({ success: true, data: userInfo.data })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const verifyToken = async (req: Request, res: Response): Promise<any> => {
  try {
    const { token } = req.cookies
    console.log('🚀 ~ file: auth.controller.ts:35 ~ verifyToken ~ token:', token)
    if (!token) return res.status(400).json({ success: false, data: { message: 'token not found' } })

    jwt.verify(token, config.secretToken, async (error: any, user: any): Promise<Response> => {
      if (error) return res.status(400).json({ success: false, data: { message: 'invalid token' } })

      const userFound = await authServices.findUserById(user?.id)
      if (!userFound) return res.status(400).json({ success: false, data: { message: 'id not found' } })

      return res.status(200).json({ success: true, data: userFound })
    })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const logOut = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.cookie('token', '')
    return res.status(200).json({ success: true, data: { message: 'logout success' } })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}
