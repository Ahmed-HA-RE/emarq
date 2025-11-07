import connectDB from 'config/database';
import Property from 'models/Property';
import { TProperty } from 'type';
import { ArrowLeft, Home } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { Alert, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await connectDB();
  const { location } = await searchParams;
  const { propertyType } = await searchParams;

  const query: any = {
    $or: [
      { name: { $regex: location, $options: 'i' } },
      { description: { $regex: location, $options: 'i' } },
      { 'location.street': { $regex: location, $options: 'i' } },
      { 'location.city': { $regex: location, $options: 'i' } },
      { 'location.state': { $regex: location, $options: 'i' } },
    ],
  };

  if (propertyType !== 'All') {
    query.type = propertyType;
  }

  const properties = await Property.find(query).lean();
  const serializedProperties: TProperty[] = JSON.parse(
    JSON.stringify(properties)
  );

  return (
    <>
      <header className='bg-blue-700 p-4 py-6'>
        <div className='max-w-2xl mx-auto'>
          <PropertySearchForm />
        </div>
      </header>

      <section className='p-6 py-14 min-h-screen'>
        <div className='container'>
          <Link
            className='text-blue-500 hover:underline mb-10 inline-block'
            href='/properties'
          >
            <ArrowLeft className='inline-block mr-1' />
            Back To Properties
          </Link>
          {serializedProperties.length === 0 ? (
            <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-xl mx-auto'>
              <Home />
              <AlertTitle>No Properties Found</AlertTitle>
            </Alert>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {serializedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
