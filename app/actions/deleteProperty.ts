'use server';

import cloudinary from 'config/cloudinary';
import connectDB from 'config/database';
import Property from 'models/Property';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const deleteProperty = async (propertyId: string) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('No user id found');
  }

  const userId = session.user.id;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('No property found');
  }

  if (userId !== property.owner.toString()) {
    throw new Error('You are not authorized');
  }

  const publicIds: string[] = property.images.map((imageURL: string) => {
    const parts = imageURL.split('/').at(-1)?.split('.').slice(0, 2).join('.');
    return parts;
  });

  for (const publicId of publicIds) {
    await cloudinary.uploader.destroy(`emarq/${publicId}`);
  }

  await property.deleteOne();
  revalidatePath('/', 'layout');
};

export default deleteProperty;
