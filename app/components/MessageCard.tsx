'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { MessagesResults } from 'type';
import { successToast, destructiveToast } from '@/utils/toast';
import ScreenSpinner from './ScreenSpinner';
import { useState } from 'react';
import { markMessage } from '@/actions/markMessage';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { TriangleAlertIcon } from 'lucide-react';
import deleteMessage from '@/actions/deleteMessage';
import useMessageStore from '@/store/message';

const MessageCard = ({ message }: { message: MessagesResults }) => {
  const [pending, setPending] = useState(false);
  const [isRead, setIsRead] = useState(message.read);
  const [modal, setModal] = useState(false);
  const setAddCount = useMessageStore((state) => state.setAddCount);
  const setRemoveCount = useMessageStore((state) => state.setRemoveCount);

  const handleReadToggle = async () => {
    try {
      setPending(true);
      const read: boolean = await markMessage(message._id);
      setIsRead(read);
      successToast(read ? 'Message read' : 'Message is unread');

      if (read) {
        setRemoveCount();
      } else {
        setAddCount();
      }
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setPending(false);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      setPending(true);
      await deleteMessage(message._id);
      successToast('Message Deleted');
      setRemoveCount();
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {pending && <ScreenSpinner />}
      <Card key={message._id} className='rounded-md gap-1 py-4 relative mb-4'>
        <CardHeader className='px-4 '>
          <CardTitle className='!text-xl md:!text-2xl leading-8'>
            Property Inquiry:{' '}
            <span className='font-normal'>{message.property.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='text-base px-4'>
          <p>{message.body}</p>
          <ul className='mt-4 flex flex-col space-y-0.5'>
            <li>
              <h4 className='inline-block font-bold'>Name: </h4>{' '}
              <span>{message.name}</span>
            </li>
            <li>
              <h4 className='inline-block font-bold'>Reply Email: </h4>{' '}
              <a className='text-blue-400' href={`mailto:${message.email}`}>
                {message.email}
              </a>
            </li>
            <li>
              <h4 className='inline-block font-bold'>Reply Phone: </h4>{' '}
              <a className='text-blue-400' href={`tel:${message.phone}`}>
                {message.phone}
              </a>
            </li>
            <li>
              <h4 className='inline-block font-bold'>Received: </h4>{' '}
              <span>
                {new Date(message.createdAt).toLocaleDateString()}{' '}
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className='mt-4 px-4 space-x-2'>
          <Button
            onClick={handleReadToggle}
            className='h-9 px-3 bg-blue-500 hover:bg-blue-600'
          >
            {isRead ? 'Mark As New' : 'Mark As Read'}
          </Button>
          <Button
            onClick={() => setModal(true)}
            className='h-9 px-3 bg-red-500 hover:bg-red-600'
          >
            Delete
          </Button>
        </CardFooter>
        {!isRead && (
          <Badge className='rounded-full border-none bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5 absolute right-0 top-0'>
            <span
              className='size-1.5 rounded-full bg-amber-600 dark:bg-amber-400'
              aria-hidden='true'
            />
            New
          </Badge>
        )}
      </Card>
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
              message and remove it from your listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
              className='bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MessageCard;
