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
import { RegisterUser, registerUserSchema } from '@/schema/userSchema';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signUpUser } from '@/actions/auth';
import { Spinner } from './ui/spinner';
import { useRouter } from 'next/navigation';

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

      toast.success(result.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-600))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-600))',
        } as React.CSSProperties,
      });

      setTimeout(() => router.push('/'), 1000);
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    }

    setIsPending(false);
  };

  return (
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button disabled={isPending} size={'xl'} type='submit'>
            {isPending ? <Spinner strokeWidth={1.5} /> : 'Create Account'}
          </Button>
        </Field>
        <FieldSeparator></FieldSeparator>
        <Field>
          <div className='flex flex-row md:flex-row items-center justify-center gap-3'>
            <Button className='bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 text-sm'>
              <span className='pointer-events-none me-2 flex-1'>
                <FaGoogle className='opacity-80' size={16} aria-hidden='true' />
              </span>
              Sign up with Google
            </Button>
            <Button className='bg-black/70 text-white after:flex-1 text-sm'>
              <span className='pointer-events-none me-2 flex-1'>
                <FaGithub size={16} aria-hidden='true' />
              </span>
              Sign up with Github
            </Button>
          </div>
          <FieldDescription className='px-6 text-center text-white'>
            Already have an account?{' '}
            <Link className='hover:text-blue-400 transition' href='/signin'>
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
