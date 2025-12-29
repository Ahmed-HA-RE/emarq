import connectDB from 'config/database';
import Property from 'models/Property';
import { TProperty } from 'type';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedProperties = async () => {
  await connectDB();
  const featuredProperties = await Property.find({ is_featured: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean<TProperty[]>();

  return (
    <section className='p-4 py-8 my-14 bg-blue-50'>
      <div className='container'>
        <h2 className='text-3xl text-blue-500 font-bold text-center mb-6'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredProperties.map((property) => (
            <Card key={property._id} className='w-full py-0 lg:flex-row gap-4'>
              <CardContent className='grow-1 px-0 h-64'>
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  className='w-full h-64 rounded-xl lg:rounded-l-xl lg:rounded-r-none'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </CardContent>
              <div className='sm:min-w-72 flex flex-col justify-center '>
                <CardHeader className='md:pt-6 lg:px-0 w-full gap-4'>
                  <div>
                    <CardTitle className='text-xl'>{property.name}</CardTitle>
                    <small className='text-gray-500 font-bold'>
                      {property.type}
                    </small>
                  </div>
                  <CardDescription className='text-base'>
                    {property.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className='py-4 w-full lg:px-0 lg:pr-4'>
                  <Button
                    asChild
                    className='bg-transparent bg-gradient-to-br from-purple-500 to-pink-500 text-white focus-visible:ring-pink-600/20 w-full'
                  >
                    <Link href={`/properties/${property._id}`}>Details</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
