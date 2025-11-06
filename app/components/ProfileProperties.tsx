import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TProperty } from 'type';
import Image from 'next/image';

const ProfileProperties = ({ property }: { property: TProperty }) => {
  return (
    <div>
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          alt={property.name}
          width={0}
          height={0}
          sizes='100vw'
          className='h-52 object-cover w-full rounded-md hover:scale-105 transition duration-300'
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street}
          {', '}
          {property.location.city}
        </p>
      </div>
      <div className='mt-2'>
        <Button
          asChild
          size={'lg'}
          className='bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600'
        >
          <Link href={''}>Edit</Link>
        </Button>
        <Button
          size={'lg'}
          className='bg-red-500 text-white rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProfileProperties;
