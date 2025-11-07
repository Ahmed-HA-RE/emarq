import Property from 'models/Property';
import { auth } from '@/lib/auth';
import connectDB from 'config/database';
import { headers } from 'next/headers';
import { TProperty } from 'type';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Home } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';

const SavedPropertiesPage = async () => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Not Authorized');
  }

  const { bookmarks } = session.user;

  const bookedMarkedProperties = await Property.find({
    _id: { $in: bookmarks },
  }).lean();

  const serializedProperties: TProperty[] = JSON.parse(
    JSON.stringify(bookedMarkedProperties)
  );

  return (
    <section className='p-8 py-10'>
      <div className='container'>
        <h1 className='text-2xl md:text-3xl font-bold mb-7'>
          Your Saved Properties
        </h1>
        {serializedProperties.length === 0 ? (
          <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-lg mx-auto min-h-screen'>
            <Home />
            <AlertTitle>No saved properties </AlertTitle>
          </Alert>
        ) : (
          <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {serializedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
