import { Metadata } from 'next';
import { Button } from './components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or was moved.",
};

const NotFoundPage = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-black text-white'>
      <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
        <h2 className='mb-6 text-5xl font-semibold'>Whoops!</h2>
        <h3 className='mb-1.5 text-3xl font-semibold'>Something went wrong</h3>
        <p className='text-white opacity-80 mb-6 max-w-sm'>
          The page you&apos;re looking for isn&apos;t found, we suggest you back
          to home.
        </p>
        <Button asChild size='xl' className='rounded-lg text-base shadow-sm'>
          <Link href='/'>Back to home page</Link>
        </Button>
      </div>

      {/* Right Section */}
      <div className='relative max-h-screen w-full  max-lg:hidden'>
        <div className='h-full w-full bg-white'></div>
        <Image
          src='/404-page.jpg'
          alt='404-Image'
          className='object-cover object-center'
          width={0}
          height={0}
          fill
          sizes='100%'
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
