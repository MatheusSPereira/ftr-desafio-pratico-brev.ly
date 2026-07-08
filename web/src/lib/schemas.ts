import { z } from 'zod'

export const createLinkSchema = z.object({
  originalUrl: z.string().url('Informe uma URL válida'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]{3,50}$/, 'Informe uma url minúscula e sem espaço/caracter especial'),
})

export type CreateLinkInput = z.infer<typeof createLinkSchema>
