import { auth } from '@/lib/auth';
import Image from 'next/image';
import connectDB from 'config/database';
import { headers } from 'next/headers';
import Property from 'models/Property';
import { TProperty } from 'type';
import ProfileProperties from '@/components/ProfileProperties';

const ProfilePage = async () => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('No user found ');
  }

  const properties = await Property.find({ owner: session.user.id }).lean<
    TProperty[]
  >();

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-14'>
        <div className='bg-white px-6 py-10 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-10 md:mb-15 '>Your Profile</h1>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='md:pl-14 md:flex-1/3'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={session.user.image || session.user.defaultAvatar}
                  alt={session.user.name}
                  width={0}
                  height={0}
                  sizes='100%'
                  loading='eager'
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>{' '}
                {session.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{' '}
                {session.user.email}
              </h2>
            </div>

            <div className='flex-3/4 flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold'>Your Listings</h2>

              {properties.map((property) => (
                <ProfileProperties key={property._id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
