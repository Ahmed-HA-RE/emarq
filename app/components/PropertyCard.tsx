import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaBath, FaBed, FaRuler } from 'react-icons/fa';
import { Banknote, MapPinHouse } from 'lucide-react';
import { Button } from './ui/button';
import { PropertyFrontend } from 'type';
import getPropertyRates from '@/utils/getPropertyRates';

type PropertyCardProps = {
  property: PropertyFrontend;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className='relative rounded-2xl  pt-0 shadow-lg overflow-hidden'>
      <div className='flex h-70 md:h-64 lg:h-60  relative overflow-hidden'>
        <Image
          src={`/properties/${property.images[0]}`}
          alt=''
          className='w-full rounded-t-2xl object-cover'
          width={0}
          height={0}
          sizes='100%'
          loading='eager'
        />
        <div className='flex flex-row items-center space-x-1 absolute top-4 right-2 bg-white shadow rounded-md p-2 px-3 text-blue-500 font-semibold'>
          <span className='dirham-symbol '>&#xea;</span>
          <p>{getPropertyRates(property.rates)}</p>
        </div>
      </div>

      <Card className='border-none gap-4 h-full py-4'>
        <CardHeader className='gap-0.5'>
          <CardDescription className='text-base'>
            {property.type}
          </CardDescription>
          <CardTitle className='text-xl'>{property.name}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-wrap items-center justify-center gap-4 max-w-xs mx-auto px-0'>
          <span className='text-gray-500 flex flex-row items-center space-x-1.5'>
            <FaBed size={20} />
            <p>
              {property.beds > 1
                ? `${property.beds} Beds`
                : `${property.beds} Bed`}
            </p>
          </span>
          <span className='text-gray-500 flex flex-row items-center space-x-1.5'>
            <FaBath size={17} />
            <p>
              {property.baths > 1
                ? `${property.baths} Baths`
                : `${property.baths} Bath`}
            </p>
          </span>
          <span className='text-gray-500 flex flex-row items-center space-x-1.5'>
            <FaRuler size={20} />
            <p>{property.square_feet} sqft </p>
          </span>
          {/* rates */}
          {Object.keys(property.rates).map((rate, index) => (
            <span
              key={index}
              className='text-green-800 flex flex-row items-center space-x-1.5'
            >
              <Banknote size={20} />
              <p className='text-sm'>
                {`${rate.charAt(0).toUpperCase()}${rate.slice(1)}`}
              </p>
            </span>
          ))}
        </CardContent>
        <Separator />
        <CardFooter className='justify-between items-start md:items-center gap-4 flex-col md:flex-row'>
          <div className='flex items-center space-x-2 text-orange-700 flex-1/2'>
            <MapPinHouse />
            <p>Boston MA</p>
          </div>
          <Button
            asChild
            className='bg-blue-500 hover:bg-blue-600 w-full md:flex-1/3'
            size='default'
          >
            <Link href={`/properties/${property._id}`}>Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyCard;
