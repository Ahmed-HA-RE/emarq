import z from 'zod';

export const registerUserSchema = z
  .object({
    name: z
      .string({ error: 'Invalid Name' })
      .nonempty({ error: 'Name is required' })
      .min(3, { error: 'Name must be at least 3 characters' })
      .max(20, { error: 'Name mut not exceed 20 characters' }),
    email: z.email({ error: 'Invalid email' }),
    password: z
      .string({ error: 'Invalid Passowrd' })
      .nonempty({ error: 'Password is required' })
      .min(6, { error: 'Password must be at least 6 characters' })
      .max(25, { error: 'Password mut not exceed 20 characters' }),
    confirmPassword: z
      .string({ error: 'Invalid Passowrd' })
      .nonempty({ error: 'Confirm Passowrd is required' })
      .min(6, { error: 'Password must be at least 6 characters' })
      .max(25, { error: 'Password mut not exceed 20 characters' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    error: "Passwords don't match",
  });

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const loginUserSchema = registerUserSchema.pick({
  email: true,
  password: true,
});

export type LoginUser = z.infer<typeof loginUserSchema>;

export const forgotPasswordSchema = registerUserSchema.pick({
  email: true,
});

export type ForgotPass = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ error: 'Invalid Passowrd' })
      .nonempty({ error: 'Password is required' })
      .min(6, { error: 'Password must be at least 6 characters' })
      .max(25, { error: 'Password mut not exceed 20 characters' }),
    confirmPassword: z
      .string({ error: 'Invalid Passowrd' })
      .nonempty({ error: 'Confirm Passowrd is required' })
      .min(6, { error: 'Password must be at least 6 characters' })
      .max(25, { error: 'Password mut not exceed 20 characters' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    error: "Passwords don't match",
  });

export type ResetPass = z.infer<typeof resetPasswordSchema>;
