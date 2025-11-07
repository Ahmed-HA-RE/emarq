'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { Message, messageSchema } from '@/schema/messageSchema';

const PropertyContactForm = () => {
  const form = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: Message) => {};

  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend className='!text-xl font-semibold mb-6'>
              Contact Property Manager
            </FieldLegend>
            <FieldGroup>
              {/* Name */}
              <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                    <Input
                      id='name'
                      type='text'
                      aria-invalid={fieldState.invalid}
                      placeholder='Name'
                      className='text-black placeholder:text-black focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Email */}
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                    <Input
                      id='email'
                      type='email'
                      aria-invalid={fieldState.invalid}
                      placeholder='m@example.com'
                      className='text-black placeholder:text-black focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Phone */}
              <Controller
                name='phone'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='phone'>Phone</FieldLabel>
                    <Input
                      id='phone'
                      type='phone'
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your phone number'
                      className='text-black placeholder:text-black focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Message */}
              <Controller
                name='message'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                    <div className='w-full space-y-2'>
                      <Textarea
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm min-h-30 resize-none'
                        {...field}
                      />
                      <div className='flex flex-row-reverse items-center justify-between'>
                        <p className='text-muted-foreground text-end text-xs'>
                          {!fieldState.invalid &&
                            'Message the seller directly.'}
                        </p>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <Button
            size={'lg'}
            className='w-full bg-blue-500 hover:bg-blue-600 rounded-full font-bold mt-5'
          >
            <Send className='size-5' />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyContactForm;
