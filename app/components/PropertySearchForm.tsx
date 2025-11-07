'use client';

import { Input } from './ui/input';
import { NativeSelect, NativeSelectOption } from './ui/native-select';
import selectOptions from '@/utils/selectOptions';
import { Button } from './ui/button';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const PropertySearchForm = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('All');
  const pathname = usePathname();
  const router = useRouter();

  const handleFiltering = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchLocation === '' && searchType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${searchLocation}&propertyType=${searchType}`;
      router.push(`/properties/search${query}`);
    }
  };

  return (
    <form
      onSubmit={handleFiltering}
      className='flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full mx-auto mt-3'
    >
      <Input
        placeholder='Enter Location'
        className='w-full h-11 bg-white focus-visible:border-blue-400 focus-visible:ring-blue-400 placeholder:text-gray-400 placeholder:text-base'
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      />
      <div className='flex-1/2'>
        <NativeSelect
          className='text-black h-11 bg-white text-base  focus-visible:border-blue-400 focus-visible:ring-blue-400'
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          {selectOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <Button
        size={'xl'}
        className={cn(
          'text-base',
          pathname === '/'
            ? 'bg-blue-700 hover:bg-blue-800'
            : 'bg-blue-500 hover:bg-blue-600'
        )}
      >
        Search
      </Button>
    </form>
  );
};

export default PropertySearchForm;
