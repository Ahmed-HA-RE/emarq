'use server';
import connectDB from 'config/database';
import Property from 'models/Property';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { headers } from 'next/headers';
import cloudinary from 'config/cloudinary';
import { UpdateProperty, updatePropertySchema } from '@/schema/propertySchema';

const updateProperty = async (properyId: string, data: UpdateProperty) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('No user logged in');

  const result = updatePropertySchema.safeParse(data);
  if (!result.success) {
    throw new Error('Please make sure everything is filled correctly');
  }

  const property = await Property.findById(properyId);

  if (property.owner.toString() !== session.user.id) {
    throw new Error('Not Authorized');
  }

  if (data.images.length > 0) {
    const imagesFile = data.images.filter((file) => file.name !== '');

    const filesTotalSize = imagesFile.reduce((a, c) => a + c.size, 0);

    const maxFileSize = 15 * 1024 * 1024; // 15mb

    if (filesTotalSize > maxFileSize) {
      throw new Error('Total images size should be less than 15mb');
    }
    const images = await Promise.all(
      imagesFile.map(async (imageFile) => {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const imagesURL: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'emarq' }, function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            })
            .end(buffer);
        });
        return imagesURL.secure_url;
      })
    );
    property.images = images;
  }

  property.name = result.data?.name || property.name;
  property.type = result.data?.type || property.type;
  property.description = result.data?.description || property.description;
  property.location = result.data?.location || property.location;
  property.beds = result.data?.beds || property.beds;
  property.baths = result.data?.baths || property.baths;
  property.square_feet = result.data?.square_feet || property.square_feet;
  property.amenities = result.data?.amenities || property.amenities;
  property.rates = result.data?.rates || property.rates;
  property.seller_info = result.data?.seller_info || property.seller_info;

  await property.save();

  revalidatePath('/', 'layout');

  return JSON.parse(JSON.stringify(property));
};

export default updateProperty;
