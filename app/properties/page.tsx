import { House } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import PropertyCard from '@/components/PropertyCard';
import connectDB from 'config/database';
import Property from 'models/Property';
import { TProperty } from 'type';
import PaginationButtons from '@/components/Pagination';

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await connectDB();
  const page = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 4;
  const totalPages = Math.ceil((await Property.countDocuments({})) / pageSize);
  const properties: TProperty[] = await Property.find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return (
    <section className='p-6 my-10'>
      <div className='container'>
        {properties.length === 0 ? (
          <div className='min-h-screen '>
            <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-md mx-auto'>
              <House />
              <AlertTitle>No properties found</AlertTitle>
            </Alert>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <PaginationButtons page={page} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default PropertiesPage;
