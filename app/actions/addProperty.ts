'use server';

import { AddProperty, addPropertySchema } from '@/schema/propertySchema';
import z from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Property from 'models/Property';
import { revalidatePath } from 'next/cache';
import connectDB from 'config/database';
import { redirect } from 'next/navigation';

export const addProperty = async (data: AddProperty) => {
  await connectDB();

  const result = addPropertySchema.safeParse(data);
  if (!result.success) {
    console.log(z.flattenError(result.error).fieldErrors);
  }

  const imagesFormat = data.images
    .filter((file) => file.name !== '')
    .map((file) => file.name);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('No user logged in');

  const propertyData = {
    owner: session.user.id,
    name: data.name,
    type: data.type,
    description: data.description,
    amenities: data.amenities,
    baths: data.baths,
    beds: data.beds,
    images: imagesFormat,
    location: data.location,
    rates: data.rates,
    seller_info: data.seller_info,
    square_feet: data.square_feet,
  };

  const newProperty = await Property.create(propertyData);

  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
};
