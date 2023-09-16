import express from 'express'
import type { Request, Response, Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from 'src/api/index'
import config from 'src/config/index'

export default async (app: Express): Promise<express.Express> => {
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173'
    })
  )
  app.use(morgan('dev'))
  app.use(cookieParser())

  // Transforms the raw string of req.body into json
  app.use(express.json())

  // mdiddleware for parsing URL-encoded data sent from HTML forms.
  app.use(express.urlencoded({ extended: false }))

  app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
  })

  // Load API routes
  app.use(config.api.prefix, routes())

  app.get('*', (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      data: { message: 'Not Found' }
    })
  })

  return app
}
