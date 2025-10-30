import PropertyCard from './PropertyCard';
import { Alert, AlertTitle } from './ui/alert';
import { House } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import connectDB from 'config/database';
import Property from 'models/Property';
import { PropertyFrontend } from 'type';

const RecentProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean<PropertyFrontend[]>();

  return (
    <section className='px-4 my-14'>
      <div className='container'>
        <h2 className='text-3xl text-blue-500 font-bold text-center mb-6'>
          Recent Properties
        </h2>
        {recentProperties.length === 0 ? (
          <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-md mx-auto'>
            <House />
            <AlertTitle>No properties found</AlertTitle>
          </Alert>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <div className='w-full max-w-md mx-auto my-12 '>
          <Button
            asChild
            size={'xl'}
            className='rounded-lg h-14 text-base w-full'
          >
            <Link href='/properties'>View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;
