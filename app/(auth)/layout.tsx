import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10 bg-blue-700 text-white'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-md'>{children}</div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src={'/auth.jpg'}
          width={0}
          height={0}
          sizes='100vw'
          alt='Authentication Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          loading='eager'
        />
      </div>
    </div>
  );
};

export default AuthLayout;
