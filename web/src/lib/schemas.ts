import { z } from 'zod'

export const createLinkSchema = z.object({
  originalUrl: z.string().url('Informe uma URL válida'),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9-]{3,50}$/, 'Use apenas letras, números e hífens (3 a 50 caracteres)'),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>
