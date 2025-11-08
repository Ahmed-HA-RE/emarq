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
import { CircleAlertIcon, Send } from 'lucide-react';
import { messageSchema } from '@/schema/messageSchema';
import { TMessage, TProperty } from 'type';
import { destructiveToast, successToast } from '@/utils/toast';
import { sendMessage } from '@/actions/addMessage';
import { auth } from '@/lib/auth';
import { useState } from 'react';
import ScreenSpinner from './ScreenSpinner';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type PropertyContactFormProps = {
  property: TProperty;
  session: typeof auth.$Infer.Session | null;
};

const PropertyContactForm = ({
  property,
  session,
}: PropertyContactFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<TMessage>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      phone: '',
      message: '',
      reciver: property.owner,
      property: property._id,
    },
    mode: 'all',
  });

  const onSubmit = async (data: TMessage) => {
    try {
      setIsPending(true);
      await sendMessage(data);
      successToast('Your message has been sent');
      form.reset();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {isPending && <ScreenSpinner />}
      {session && session?.user.emailVerified ? (
        <Card className='w-full'>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldSet>
                <FieldLegend className='!text-xl font-semibold mb-6'>
                  Contact Property Manager
                </FieldLegend>
                <FieldGroup>
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
      ) : !session?.user.emailVerified ? (
        <Alert className='border-sky-600 text-sky-600 w-full dark:border-sky-400 dark:text-sky-400'>
          <CircleAlertIcon />
          <AlertTitle>Verify your email address</AlertTitle>
          <AlertDescription className='text-sky-600/80 dark:text-sky-400/80'>
            Verify your email to contact the property owner, start selling, and
            receive inquiries about the property.
          </AlertDescription>
        </Alert>
      ) : (
        ''
      )}
    </>
  );
};

export default PropertyContactForm;
