'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { LoginUser, loginUserSchema } from '@/schema/userSchema';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signInUser, signWithSocials } from '@/actions/auth';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { destructiveToast, successToast } from '@/utils/toast';

const SignInForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const handleSocialsSignIn = async (provider: 'github' | 'google') => {
    try {
      await signWithSocials(provider);
      setTimeout(() => router.push('/'), 1000);
    } catch (error: any) {
      destructiveToast(error.message);
    }
  };

  const onSubmit = async (data: LoginUser) => {
    try {
      setIsPending(true);
      const result = await signInUser(data);
      successToast(result.message);
      setTimeout(() => router.push('/'), 1000);
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FieldGroup>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login to your account</h1>
            <p className='text-sm text-white opacity-80'>
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Email */}
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  aria-invalid={fieldState.invalid}
                  placeholder='m@example.com'
                  className='text-white placeholder:text-white focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Link
                    href='/forgot-password'
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  className='text-white placeholder:text-white focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button disabled={isPending} size={'xl'} type='submit'>
              {isPending ? <Spinner strokeWidth={1.5} /> : 'Sign In'}
            </Button>
          </Field>
          <FieldSeparator></FieldSeparator>
        </FieldGroup>
      </form>
      <div className='mt-5'>
        <div className='flex flex-row md:flex-row items-center justify-center gap-3'>
          <Button
            onClick={() => handleSocialsSignIn('google')}
            className='bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 text-sm'
          >
            <span className='pointer-events-none me-2 flex-1'>
              <FaGoogle className='opacity-80' size={16} aria-hidden='true' />
            </span>
            Sign in with Google
          </Button>
          <Button
            onClick={() => handleSocialsSignIn('github')}
            className='bg-black/70 text-white after:flex-1 text-sm'
          >
            <span className='pointer-events-none me-2 flex-1'>
              <FaGithub size={16} aria-hidden='true' />
            </span>
            Sign in with Github
          </Button>
        </div>
        <span className='px-6 text-center text-white mt-3 text-sm w-full inline-block'>
          Don&apos;t have an account?{' '}
          <Link className='hover:text-blue-400 transition' href='/signup'>
            Sign up
          </Link>
        </span>
      </div>
    </>
  );
};

export default SignInForm;
