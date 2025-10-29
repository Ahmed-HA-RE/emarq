import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className='flex mt-10 justify-center min-h-screen'>
      <Spinner strokeWidth={0.5} className='size-35 text-blue-500' />
    </div>
  );
};

export default Loading;
