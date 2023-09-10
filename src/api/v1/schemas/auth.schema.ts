import { z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
  })
})

export const signInSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is not valid' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
  })
})
