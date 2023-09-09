import jwt from 'jsonwebtoken'
import config from 'src/config'

export async function createAccessToken(payload: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, config.secretToken, (err: any, token: any) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
