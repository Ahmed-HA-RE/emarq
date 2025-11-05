'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { type AddProperty, addPropertySchema } from '@/schema/propertySchema';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import selectOptions from '@/utils/selectOptions';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import amenitiesOptions from '@/utils/amenitiesCheck';
import { Button } from './ui/button';
import { addProperty } from '@/actions/addProperty';
import { Spinner } from './ui/spinner';
import { useState } from 'react';

const AddPropertyForm = () => {
  const filterselectOptions = selectOptions.filter(
    (option) => option.value !== 'all'
  );
  const [pending, setPending] = useState(false);

  const form = useForm<AddProperty>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      name: '',
      type: 'apartment',
      description: '',
      baths: 0,
      beds: 0,
      square_feet: 0,
      location: {
        street: '',
        city: '',
        state: '',
        zipcode: '',
      },
      amenities: [],
      images: [],
      rates: {
        nightly: 0,
        weekly: 0,
        monthly: 0,
      },
      seller_info: {
        name: '',
        email: '',
        phone: '',
      },
    },
    mode: 'all',
  });

  const onSubmit = async (data: AddProperty) => {
    setPending(true);
    await addProperty(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend
          variant='legend'
          className='text-center font-bold  mb-6 data-[variant=legend]:text-2xl md:data-[variant=legend]:text-3xl'
        >
          Add Property
        </FieldLegend>
        <FieldGroup className='space-y-2'>
          {/* Name */}
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Listing Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='eg. Beautiful Villa in Abu Dhabi'
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* type */}
          <Controller
            name='type'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Property Type</FieldLabel>
                <NativeSelect
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 cursor-pointer'
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                >
                  {filterselectOptions.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            )}
          />
          {/* Description */}
          <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <div className='w-full space-y-2'>
                  <Textarea
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm min-h-30 resize-none'
                    {...field}
                  />
                  <div className='flex flex-row-reverse items-center justify-between'>
                    <p className='text-muted-foreground text-end text-xs'>
                      {!fieldState.invalid && 'Describe your property'}
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </div>
              </Field>
            )}
          />
          {/* Location */}
          <FieldSet className='bg-blue-50 p-4 gap-3'>
            <div>
              <FieldLegend className='font-bold mb-0'>Location</FieldLegend>
            </div>
            <FieldGroup>
              {/* Street */}
              <Controller
                name='location.street'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Street'
                      autoComplete='off'
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* City */}
              <Controller
                name='location.city'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='City'
                      autoComplete='off'
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* State */}
              <Controller
                name='location.state'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='State'
                      autoComplete='off'
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Zip code */}
              <Controller
                name='location.zipcode'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='Zipcode'
                      autoComplete='off'
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className='flex flex-col md:flex-row items-center'>
              {/* Beds */}
              <Controller
                name='beds'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Beds</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                      type='number'
                      min={0}
                      max={20}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Baths */}
              <Controller
                name='baths'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Baths</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                      type='number'
                      min={0}
                      max={20}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Square Feet */}
              <Controller
                name='square_feet'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Square Feet</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10 w-full border-black'
                      type='number'
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          {/* Amenities */}
          <Controller
            name='amenities'
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet>
                <FieldLegend className='font-bold' variant='label'>
                  Amenities
                </FieldLegend>
                <FieldGroup data-slot='checkbox-group'>
                  <div className='grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4'>
                    {amenitiesOptions.map((amenity) => (
                      <Field
                        key={amenity.id}
                        orientation='horizontal'
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id={amenity.id}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          checked={field.value.includes(amenity.value)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, amenity.value]
                              : field.value.filter(
                                  (value) => value !== amenity.value
                                );
                            field.onChange(newValue);
                          }}
                        />
                        <FieldLabel htmlFor={amenity.id}>
                          {amenity.label}
                        </FieldLabel>
                      </Field>
                    ))}
                  </div>
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />

          {/* Rates */}
          <FieldSet className='bg-blue-50 p-4 gap-3'>
            <div>
              <FieldLegend className='font-bold mb-1 !text-lg'>
                Rates (Leave blank if not applicable)
              </FieldLegend>
            </div>
            <FieldGroup className='md:flex-row'>
              {/* Nightly */}
              <Controller
                name='rates.nightly'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={'horizontal'}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className='text-base' htmlFor={field.name}>
                      Nightly
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-9 w-full border-black'
                      type='number'
                      min={0}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Weekly */}
              <Controller
                name='rates.weekly'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={'horizontal'}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className='text-base' htmlFor={field.name}>
                      Weekly
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-9 w-full border-black'
                      type='number'
                      min={0}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Monthly */}
              <Controller
                name='rates.monthly'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={'horizontal'}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className='text-base' htmlFor={field.name}>
                      Monthly
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-9 w-full border-black'
                      type='number'
                      min={0}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          {/* Seller Name */}
          <Controller
            name='seller_info.name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Seller Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Name'
                  autoComplete='off'
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Seller email */}
          <Controller
            name='seller_info.email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Seller Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type='email'
                  placeholder='Email address'
                  autoComplete='off'
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Seller Name */}
          <Controller
            name='seller_info.phone'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Seller Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Phone'
                  autoComplete='off'
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='images'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Images (Select up to 4 images)
                </FieldLabel>

                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  multiple
                  className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm h-10'
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    field.onChange(files);
                  }}
                />
                {!fieldState.invalid && (
                  <p className='text-muted-foreground text-end text-xs mt-2'>
                    Total file size of all selected images must not exceed 10MB.
                  </p>
                )}

                {fieldState.invalid && (
                  <FieldError className='mt-0' errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <Button
        size={'lg'}
        className='my-6 w-full rounded-full bg-blue-500 hover:bg-blue-600 font-bold'
        type='submit'
        disabled={pending}
      >
        {pending ? <Spinner /> : 'Add property'}
      </Button>
    </form>
  );
};

export default AddPropertyForm;
