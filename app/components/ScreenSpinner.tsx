import { Spinner } from './ui/spinner';

const ScreenSpinner = () => {
  return (
    <div className='fixed inset-0 h-full z-50 flex items-center justify-center bg-black/25'>
      <Spinner className='size-35 text-blue-500' />
    </div>
  );
};

export default ScreenSpinner;
