import z from 'zod';

export const addPropertySchema = z.object({
  name: z
    .string({ error: 'Invalid property name' })
    .nonempty({ error: 'Property name is required' }),
  type: z
    .string({ error: 'Invalid property type' })
    .nonempty({ error: 'Property type is required' }),
  description: z
    .string({ error: 'Invalid property description' })
    .nonempty({ error: 'Property description is required' })
    .min(4, { error: 'Please provide a description of at least 4 characters' }),
  location: z.object({
    street: z
      .string({ error: 'Invalid street' })
      .nonempty({ error: 'Street is required' }),
    city: z
      .string({ error: 'Invalid city' })
      .nonempty({ error: 'City is required' }),
    state: z
      .string({ error: 'Invalid state' })
      .nonempty({ error: 'State is required' }),
    zipcode: z
      .string({ error: 'Invalid zipcode' })
      .nonempty({ error: 'Zipcode is required' }),
  }),

  rates: z
    .object({
      nightly: z.coerce.number<number>().min(0, {
        error: 'Please provide the nighlty price for the property',
      }),
      weekly: z.coerce.number<number>().min(0, {
        error: 'Please provide the weekly price for the property',
      }),
      monthly: z.coerce.number<number>().min(0, {
        error: 'Please provide the monthly price for the property',
      }),
    })
    .optional(),

  beds: z.coerce
    .number<number>()
    .min(1, { error: 'Please provide total number of beds' })
    .max(20, { error: 'Number of beds must not exceed 20' }),
  baths: z.coerce
    .number<number>()
    .min(1, { error: 'Please provide total number of baths' })
    .max(20, { error: 'Number of baths must not exceed 20' }),
  square_feet: z.coerce
    .number<number>()
    .min(250, { error: 'Minimum total area of the property is 250' }),

  seller_info: z.object({
    name: z
      .string({ error: 'Invalid seller name' })
      .nonempty({ error: 'Seller name is required' }),
    email: z.email({ error: 'Please provide the seller email' }),
    phone: z.string().nonempty({ error: 'Seller phone number is required' }),
  }),
  amenities: z
    .array(z.string())
    .nonempty({ error: 'Please provide the amenities of the property' }),
  images: z
    .array(
      z.file().mime(['image/jpeg', 'image/png'], {
        error: 'Only extensions JPEG, PNG are supported',
      })
    )
    .max(4, { error: 'Property images must not exceed more than 4 images' })
    .nonempty({ error: 'Please provide images for the property' }),
});

export type AddProperty = z.infer<typeof addPropertySchema>;

export const updatePropertySchema = z.object({
  name: addPropertySchema.shape.name,
  type: addPropertySchema.shape.type,
  description: addPropertySchema.shape.description,
  location: addPropertySchema.shape.location,
  rates: addPropertySchema.shape.rates,
  beds: addPropertySchema.shape.beds,
  baths: addPropertySchema.shape.baths,
  square_feet: addPropertySchema.shape.square_feet,
  seller_info: addPropertySchema.shape.seller_info,
  amenities: addPropertySchema.shape.amenities,
  images: z
    .array(
      z.file().mime(['image/jpeg', 'image/png'], {
        error: 'Only extensions JPEG, PNG are supported',
      })
    )
    .max(4, { error: 'Property images must not exceed more than 4 images' }),
});

export type UpdateProperty = z.infer<typeof updatePropertySchema>;
