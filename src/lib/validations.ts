import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  projectType: z.enum([
    'custom',
    'outsourcing',
    'mobile',
    'saas',
    'automation',
    'mvp',
    'ecommerce',
    'ai',
    'joint',
    'other',
  ]),
  budget: z.enum(['u5k', '5-15k', '15-50k', '50k+', 'nd']),
  message: z.string().min(10, 'Please describe your project'),
})

export type ContactFormData = z.infer<typeof contactSchema>
