import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  frontendURL: process.env.FRONTEND_URL,
  api: {
    prefix: '/api'
  },
  secretToken: process.env.TOKEN_SECRET ?? 'secret_token_default'
}
