import AddPropertyForm from '@/components/AddPropertyForm';

const AddPropertyPage = () => {
  return (
    <section className='px-4 py-6 bg-blue-50 min-h-screen'>
      <div className='max-w-2xl mx-auto bg-white shadow rounded-md my-20 border p-6 py-8'>
        <AddPropertyForm />
      </div>
    </section>
  );
};

export default AddPropertyPage;
