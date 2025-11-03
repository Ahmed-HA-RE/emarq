import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeftIcon } from 'lucide-react';
import ForgotPassForm from '@/components/ForgotPassForm';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  return (
    <div className='min-h-screen w-full flex items-center pb-8 '>
      <Card className='w-full border-none shadow-md py-8'>
        <CardHeader className='gap-6'>
          <div>
            <CardTitle className='mb-1.5 text-2xl'>Forgot Password?</CardTitle>
            <CardDescription className='text-base'>
              Enter your email and we&apos;ll send you instructions to reset
              your password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <ForgotPassForm />

          <Link
            href='/signin'
            className='group mx-auto flex w-fit items-center gap-2 text-black'
          >
            <ChevronLeftIcon className='size-5 transition-transform duration-200 group-hover:-translate-x-0.5' />
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
