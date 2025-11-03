'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';
import { APIError } from 'better-auth';

const VerifiedEmail = ({
  expiredToken,
}: {
  expiredToken: string | string[] | undefined;
}) => {
  const [isPending, setIsPending] = useState(false);

  const handleRequestEmail = async () => {
    try {
      setIsPending(true);
      const { data: session } = await authClient.getSession();
      if (session) {
        await authClient.sendVerificationEmail({
          email: session.user.email,
          callbackURL: '/email/verify',
        });

        toast.success('Verification email sent! Please check your inbox.', {
          style: {
            '--normal-bg':
              'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-text': 'var(--color-white)',
            '--normal-border':
              'light-dark(var(--color-green-600), var(--color-green-400))',
          } as React.CSSProperties,
        });
      }
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
    <div className='min-h-screen flex flex-col items-center justify-center gap-5 p-8 pb-14'>
      <Image
        src={!expiredToken ? '/verified.png' : '/unverified.png'}
        alt='verified'
        width={120}
        height={120}
        sizes='100vw'
        unoptimized
      />
      <h2 className='text-4xl md:text-5xl font-medium'>Email Verification</h2>
      <p className='text-lg text-center max-w-xl'>
        {!expiredToken
          ? ' Your email was verified. You can continue using the app.'
          : 'Your verification link has expired. Please request a new one to verify your email and continue using the app.'}
      </p>
      {!expiredToken ? (
        <Button className='bg-green-700 hover:bg-0' size={'xl'} asChild>
          <Link href={'/'}>Back Home</Link>
        </Button>
      ) : (
        <Button
          onClick={handleRequestEmail}
          className='bg-red-500 hover:bg-0 w-46'
          disabled={isPending}
          size={'xl'}
        >
          {isPending ? (
            <Spinner className='size-9' strokeWidth={1.5} />
          ) : (
            'Request One'
          )}
        </Button>
      )}
    </div>
  );
};

export default VerifiedEmail;
