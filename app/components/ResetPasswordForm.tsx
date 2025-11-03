'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ResetPass, resetPasswordSchema } from '@/schema/userSchema';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const ResetPasswordForm = ({ token }: { token: string | string[] }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ResetPass>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: ResetPass) => {
    try {
      setIsPending(true);

      await authClient.resetPassword({
        newPassword: data.password,
        token: token as string,
      });

      toast.success('Your password has been reset successfully.', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-600))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-600))',
        } as React.CSSProperties,
      });

      setTimeout(() => router.push('/signin'), 1000);
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
          <h1 className='text-3xl font-bold'>Reset Password</h1>
          <p className='text-sm text-white opacity-80'>
            Please enter your current password and choose a new password to
            update your account security.
          </p>
        </div>

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
            {isPending ? <Spinner strokeWidth={1.5} /> : 'Reset Password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
