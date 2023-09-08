import expressLoader from './express'
import mongooseLoader from './mongoose'
import type { Express } from 'express'

export default async (expressApp: Express): Promise<void> => {
  await mongooseLoader().then(() => {
    console.log('Database Conexion Ready')
  })
  await expressLoader(expressApp)
  console.log('Express Initialized')
}
