'use server';

import { auth } from '@/lib/auth';
import {
  LoginUser,
  loginUserSchema,
  RegisterUser,
  registerUserSchema,
} from '@/schema/userSchema';
import { headers } from 'next/headers';

export const signUpUser = async (values: RegisterUser) => {
  try {
    const result = registerUserSchema.safeParse(values);

    if (!result.success) {
      return { error: 'Invalid Data' };
    }

    const { email, name, password } = result.data;

    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
        callbackURL: '/email/verify',
      },
      headers: await headers(),
    });

    return {
      message:
        'Registration successful. A confirmation email has been sent to your inbox.',
    };
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (values: LoginUser) => {
  try {
    const result = loginUserSchema.safeParse(values);

    if (!result.success) {
      return { error: 'Invalid Data' };
    }

    const { email, password } = result.data;

    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/',
      },
      headers: await headers(),
    });

    return {
      message: 'Welcome back! You’re now logged in.',
    };
  } catch (error) {
    throw error;
  }
};
