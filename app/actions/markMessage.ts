'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Message } from 'models/Message';
import connectDB from 'config/database';

export const markMessage = async (messageId: string) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('You must be logged in to be able to send messages');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('No message found');
  }

  message.read = !message.read;
  await message.save();

  return message.read;
};
