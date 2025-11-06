'use server';

import { auth } from '@/lib/auth';
import {
  LoginUser,
  loginUserSchema,
  RegisterUser,
  registerUserSchema,
  forgotPasswordSchema,
} from '@/schema/userSchema';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpUser = async (values: RegisterUser) => {
  try {
    const result = registerUserSchema.safeParse(values);

    if (!result.success) {
      throw new Error('Invalid Data');
    }

    const { email, name, password } = result.data;

    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
        callbackURL: '/verify',
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
      throw new Error('Invalid Data');
    }

    const { email, password } = result.data;

    await auth.api.signInEmail({
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

export const requestForgotPass = async (value: string) => {
  try {
    const result = forgotPasswordSchema.safeParse({ email: value });

    if (!result.success) {
      throw new Error('Invalid Data');
    }

    const { email } = result.data;

    const data = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: '/reset-password',
      },
      headers: await headers(),
    });

    return {
      message: data.message,
    };
  } catch (error) {
    throw error;
  }
};

export const signWithSocials = async (provider: 'github' | 'google') => {
  try {
    const result = await auth.api.signInSocial({
      body: {
        provider,
      },
    });

    if (result.url) {
      redirect(result.url);
    }
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    return { message: 'Signed out successfully' };
  } catch (error) {
    throw error;
  }
};
