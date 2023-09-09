import type { Request, Response } from 'express'
import * as authServices from './auth.service'

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body

    const userRegistered = await authServices.signUp({ username, email, password })

    res.cookie('token', userRegistered.token)
    return res.status(200).json({ success: true, data: userRegistered.userData })
  } catch (error: any) {
    return res.status(error?.status || 500).json({ success: false, data: { message: error?.message } })
  }
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body

    const userInfo = await authServices.signIn({ email, password })

    res.cookie('token', userInfo.token)
    return res.status(200).json({ success: true, data: userInfo.data })
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
