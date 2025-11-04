import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Button } from './ui/button';
import selectOptions from '@/utils/selectOptions';
import Aurora from './Aurora';

const Hero = () => {
  return (
    <section className='relative py-20 mb-4 md:min-h-[70vh] flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 -z-1'>
        <Aurora
          colorStops={['#1944f0', '#1612e2', '#3304f1']}
          blend={0.5}
          amplitude={1.1}
          speed={1.4}
        />
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px lg:px-8 flex flex-col items-center z-1'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white sm:text-5xl md:text-6xl'>
            Find The Perfect Rental
          </h1>
          <p className='my-4 text-lg text-white'>
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* Form */}
        <form className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-2xl mx-auto mt-3'>
          <Input
            placeholder='Enter Location (City, State , Zip etc'
            className='w-full h-11 bg-white focus-visible:border-blue-400 focus-visible:ring-blue-400 placeholder:text-gray-400 placeholder:text-base md:flex-1/3'
          />
          <NativeSelect className='text-black h-11 bg-white text-base md:flex-1/2 focus-visible:border-blue-400 focus-visible:ring-blue-400'>
            {selectOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Button
            size={'xl'}
            className='bg-blue-700 hover:bg-blue-800 text-base'
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
