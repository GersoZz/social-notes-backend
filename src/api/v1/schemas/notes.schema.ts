import { z } from 'zod'

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' }),
    description: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    date: z
      .string({ invalid_type_error: 'Date must be a string' })
      .datetime({ message: 'Invalid datetime string! Must be UTC' })
      .optional()
  })
})

export const getNoteSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required', invalid_type_error: 'Id must be a string' })
  })
})

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' }),
    description: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    date: z
      .string({ invalid_type_error: 'Date must be a string' })
      .datetime({ message: 'Invalid datetime string! Must be UTC' })
      .optional()
  }),
  params: z.object({
    id: z.string({ required_error: 'Id is required', invalid_type_error: 'Id must be a string' })
  })
})

export const deleteNoteSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required', invalid_type_error: 'Id must be a string' })
  })
})
