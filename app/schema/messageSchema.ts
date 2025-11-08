import z from 'zod';

export const messageSchema = z.object({
  reciver: z.string(),
  property: z.string(),
  phone: z.string().nonempty({ error: 'Phone number is required' }),
  message: z
    .string({ error: 'Invalid Message' })
    .nonempty({ error: 'Message is required' })
    .min(10, {
      error: 'Please provide a descriptive message of at least 10 characters',
    }),
});
