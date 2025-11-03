'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Spinner } from './ui/spinner';
import { requestForgotPass } from '@/actions/auth';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ForgotPass, forgotPasswordSchema } from '@/schema/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from './ui/field';

const ForgotPassForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPass>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: ForgotPass) => {
    try {
      setIsPending(true);
      const result = await requestForgotPass(data.email);
      console.log(result);

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
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name='email'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className='space-y-1' data-invalid={fieldState.invalid}>
            <FieldLabel className='leading-5' htmlFor='userEmail'>
              Email address*
            </FieldLabel>
            <Input
              type='email'
              id='userEmail'
              placeholder='Enter your email address'
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button disabled={isPending} size={'lg'} className='w-full' type='submit'>
        {isPending ? <Spinner strokeWidth={1.5} /> : 'Send Reset Link'}
      </Button>
    </form>
  );
};

export default ForgotPassForm;
