'use server';

import { AddProperty, addPropertySchema } from '@/schema/propertySchema';
import z from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Property from 'models/Property';
import { revalidatePath } from 'next/cache';
import connectDB from 'config/database';
import { redirect } from 'next/navigation';
import cloudinary from 'config/cloudinary';

export const addProperty = async (data: AddProperty) => {
  await connectDB();

  const result = addPropertySchema.safeParse(data);
  if (!result.success) {
    console.log(z.flattenError(result.error).fieldErrors);
  }

  const imagesFile = data.images.filter((file) => file.name !== '');

  const images = await Promise.all(
    imagesFile.map(async (imageFile) => {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imagesURL: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'emarq', public_id: imageFile.name, overwrite: true },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      });
      return imagesURL.secure_url;
    })
  );

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
    location: data.location,
    images,
    rates: data.rates,
    seller_info: data.seller_info,
    square_feet: data.square_feet,
  };

  const newProperty = await Property.create(propertyData);

  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
};
