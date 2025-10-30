import connectDB from 'config/database';
import Property from 'models/Property';
import type { TProperty } from 'type';
import Image from 'next/image';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Check, UserRoundXIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaArrowLeft, FaBath, FaBed, FaRuler } from 'react-icons/fa6';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  await connectDB();
  const property = await Property.findById(id).lean<TProperty>();

  return (
    <>
      {!property ? (
        <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-md w-full'>
          <UserRoundXIcon />
          <AlertTitle>No Property Found</AlertTitle>
        </Alert>
      ) : (
        <>
          <section>
            <Image
              src={`/properties/${property.images[0]}`}
              alt={property.name}
              width={0}
              height={0}
              sizes='100%'
              className='w-full h-[400px] object-cover'
            />
          </section>

          <section className='mt-6 my-4 px-4'>
            <div className='container'>
              <Button
                asChild
                variant='link'
                className='gap-2 text-blue-500 p-0'
              >
                <Link href='/properties'>
                  <FaArrowLeft
                    className='opacity-90'
                    size={16}
                    aria-hidden='true'
                  />
                  Back to Properties
                </Link>
              </Button>
            </div>
          </section>

          <section className='mb-6 px-4 bg-blue-50'>
            <div className='container py-8'>
              <div className='flex flex-col md:flex-row gap-y-6 gap-x-4'>
                {/* Left side */}
                <div className='grid grid-cols-1 items-center justify-center gap-5 flex-1/2'>
                  {/* Property info card */}
                  <Card className='text-center gap-5'>
                    <CardHeader className='gap-3 text-center md:text-left'>
                      <p className='text-base text-gray-500'>{property.type}</p>
                      <CardTitle className='text-3xl md:text-3xl font-bold'>
                        {property.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='w-full'>
                      <span className='flex flex-row items-center justify-center md:justify-start  gap-1 mb-6'>
                        <MapPin className='text-orange-700' />
                        <p className='text-orange-700'>
                          {property.location.street} {property.location.city},{' '}
                          {''}
                          {property.location.zipcode}
                        </p>
                      </span>
                      <div className='bg-gray-800 text-white p-2.5 text-lg font-semibold text-center md:text-left mb-7'>
                        Rates & Options
                      </div>

                      <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                        {/* nightly */}
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <span className='text-gray-500 font-medium'>
                            Nightly
                          </span>
                          {property.rates.nightly ? (
                            <div className='flex flex-row items-center space-x-1 text-blue-500 text-lg'>
                              <span className='dirham-symbol '>&#xea;</span>
                              <p>{property.rates.nightly}</p>
                            </div>
                          ) : (
                            <X className='text-red-600' />
                          )}
                        </div>
                        <Separator className='bg-gray-300 my-5 md:hidden' />

                        {/* monthly */}
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <span className='text-gray-500 font-medium'>
                            Monthly
                          </span>
                          {property.rates.monthly ? (
                            <div className='flex flex-row items-center space-x-1 text-blue-500 text-lg'>
                              <span className='dirham-symbol'>&#xea;</span>
                              <p>{property.rates.monthly}</p>
                            </div>
                          ) : (
                            <X className='text-red-600' />
                          )}
                        </div>
                        <Separator className='bg-gray-300 my-5 md:hidden' />
                        {/* weekly */}
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <span className='text-gray-500 font-medium'>
                            Weekly
                          </span>
                          {property.rates.weekly ? (
                            <div className='flex flex-row items-center space-x-1 text-blue-500 text-lg'>
                              <span className='dirham-symbol'>&#xea;</span>
                              <p>{property.rates.weekly}</p>
                            </div>
                          ) : (
                            <X className='text-red-600' />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description card */}
                  <Card>
                    <CardHeader className='gap-1.5'>
                      <CardTitle className='text-lg'>
                        Description & Details
                      </CardTitle>
                      <CardDescription>{property.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-wrap items-center justify-center gap-4'>
                      <span className='text-blue-500 flex flex-row items-center space-x-1.5'>
                        <FaBed size={25} />
                        <p className='text-lg'>
                          {property.beds > 1
                            ? `${property.beds} Beds`
                            : `${property.beds} Bed`}
                        </p>
                      </span>
                      <span className='text-blue-500 flex flex-row items-center space-x-1.5'>
                        <FaBath size={20} />
                        <p className='text-lg'>
                          {property.baths > 1
                            ? `${property.baths} Baths`
                            : `${property.baths} Bath`}
                        </p>
                      </span>
                      <span className='text-blue-500 flex flex-row items-center space-x-1.5'>
                        <FaRuler size={22} />
                        <p>{property.square_feet} sqft </p>
                      </span>
                    </CardContent>
                  </Card>

                  {/* Amenities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-2'>
                        {property.amenities.map((amenity, index) => (
                          <li key={index}>
                            <Check className='inline-block text-green-600' />{' '}
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                {/* Right side */}
                <aside className='flex-1/4 w-full bg-red-500'></aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;
