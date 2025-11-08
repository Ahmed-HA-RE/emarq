import z from 'zod';

export const messageSchema = z.object({
  sender: z.string(),
  reciver: z.string(),
  property: z.string(),
  name: z
    .string({ error: 'Invalid Name' })
    .nonempty({ error: 'Name is required' })
    .min(3, { error: 'Name must be at least 3 characters' })
    .max(20, { error: 'Name mut not exceed 20 characters' }),
  email: z.email({ error: 'Invalid email' }),
  phone: z.string().nonempty({ error: 'Phone number is required' }),
  message: z
    .string({ error: 'Invalid Message' })
    .nonempty({ error: 'Message is required' })
    .min(10, {
      error: 'Please provide a descriptive message of at least 10 characters',
    }),
});
