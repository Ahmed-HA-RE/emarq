'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TProperty } from 'type';
import Image from 'next/image';
import deleteProperty from '@/actions/deleteProperty';
import { TriangleAlertIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { destructiveToast, successToast } from '@/utils/toast';
import ScreenSpinner from './ScreenSpinner';

const ProfileProperties = ({ property }: { property: TProperty }) => {
  const [modal, setModal] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDeleteProperty = async () => {
    try {
      setPending(true);
      await deleteProperty(property._id);
      successToast('Property deleted successfully');
      setModal(false);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      {pending && <ScreenSpinner />}
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
          onClick={() => setModal(true)}
        >
          Delete
        </Button>
      </div>
      <AlertDialog open={modal} onOpenChange={setModal}>
        <AlertDialogContent>
          <AlertDialogHeader className='items-center'>
            <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
              <TriangleAlertIcon className='text-destructive size-6' />
            </div>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              This action cannot be undone. This will permanently delete your
              property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className='bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileProperties;
