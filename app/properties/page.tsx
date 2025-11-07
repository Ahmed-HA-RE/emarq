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
  );
};

export default PropertiesPage;
