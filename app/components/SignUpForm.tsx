'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { RegisterUser, registerUserSchema } from '@/schema/userSchema';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpUser } from '@/actions/auth';
import { Spinner } from './ui/spinner';
import { useRouter } from 'next/navigation';
import { destructiveToast, successToast } from '@/utils/toast';

const SignupForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      setIsPending(true);
      const result = await signUpUser(data);
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
            <h1 className='text-3xl font-bold'>Create your account</h1>
            <p className='text-sm text-white opacity-80'>
              Fill in the form below to create your account
            </p>
          </div>
          {/* Name */}
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                <Input
                  id='name'
                  type='text'
                  aria-invalid={fieldState.invalid}
                  placeholder='Name'
                  className='text-white placeholder:text-white focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
                <FieldLabel htmlFor='password'>Password</FieldLabel>
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
          {/* Confirm Password */}
          <Controller
            name='confirmPassword'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='password'>Confirm Password</FieldLabel>
                <Input
                  id='Confirmpassword'
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
              {isPending ? <Spinner strokeWidth={1.5} /> : 'Create Account'}
            </Button>
          </Field>
          <FieldSeparator></FieldSeparator>
        </FieldGroup>
      </form>
      <span className='px-6 text-center text-white mt-3 text-sm w-full inline-block my-5'>
        Already have an account?{' '}
        <Link className='hover:text-blue-400 transition' href='/signin'>
          Sign in
        </Link>
      </span>
    </>
  );
};

export default SignupForm;
