import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen relative'>
      <Spinner strokeWidth={0.5} className='size-35 text-blue-500 z-20 mb-20' />
    </div>
  );
};

export default Loading;
