import ResetPasswordForm from '@/components/ResetPasswordForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token;

  return !token ? (
    <div className='min-h-screen flex flex-col items-center justify-center gap-5 pb-14'>
      <Image
        src={'/unverified.png'}
        alt='verified'
        width={120}
        height={120}
        sizes='100vw'
        unoptimized
      />
      <h2 className='text-4xl md:text-5xl font-medium'>Email Verification</h2>
      <p className='text-lg text-center max-w-xl'>
        Your reset password link has expired. Please request a new one to reset
        your password.
      </p>
      <Button className='bg-red-500 hover:bg-0 w-46' size={'xl'} asChild>
        <Link href='/signin'>Back to sign in</Link>
      </Button>
    </div>
  ) : (
    <ResetPasswordForm token={token} />
  );
};

export default ResetPasswordPage;
