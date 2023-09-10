import type { Request, Response, NextFunction } from 'express'
import type { AnyZodObject } from 'zod'
import { ZodError } from 'zod'

export const validateSchema = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
    next()
  } catch (error: any) {
    if (error instanceof ZodError)
      return res.status(400).json({
        success: false,
        data: {
          message: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message
          })),
          type: 'ZodError'
        }
      })

    return res.status(400).json({ success: false, data: { message: error?.message } })
  }
}
