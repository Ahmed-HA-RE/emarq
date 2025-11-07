import Aurora from './Aurora';
import PropertySearchForm from './PropertySearchForm';

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
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
