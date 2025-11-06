import EditPropertyForm from '@/components/EditPropertyForm';
import { Alert, AlertTitle } from '@/components/ui/alert';
import connectDB from 'config/database';
import { Home } from 'lucide-react';
import Property from 'models/Property';
import { TProperty } from 'type';

const EditPropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  await connectDB();

  const property = await Property.findById(id).lean();
  const serializableProperty: TProperty = JSON.parse(JSON.stringify(property));

  return (
    <section className='px-4 py-6 bg-blue-50 min-h-screen'>
      <div className='max-w-2xl mx-auto bg-white shadow rounded-md my-20 border p-6 py-8'>
        {!property ? (
          <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-xl mx-auto'>
            <Home />
            <AlertTitle>No property found.</AlertTitle>
          </Alert>
        ) : (
          <EditPropertyForm property={serializableProperty} />
        )}
      </div>
    </section>
  );
};

export default EditPropertyPage;
