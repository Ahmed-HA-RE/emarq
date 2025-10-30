import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Button } from '@/components/ui/button';
import selectOptions from '@/utils/selectOptions';
import { House } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import PropertyCard from '@/components/PropertyCard';
import connectDB from 'config/database';
import Property from 'models/Property';
import { TProperty } from 'type';

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean<TProperty[]>();

  return (
    <>
      <header className='bg-blue-700 p-4 py-6'>
        {/* Form */}
        <form className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-2xl mx-auto'>
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
            className='bg-blue-500 hover:bg-blue-600 text-base'
          >
            Search
          </Button>
        </form>
      </header>

      <section className='p-6 my-10'>
        <div className='container'>
          {properties.length === 0 ? (
            <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-md mx-auto'>
              <House />
              <AlertTitle>No properties found</AlertTitle>
            </Alert>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
