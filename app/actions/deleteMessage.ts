'use server';

import connectDB from 'config/database';
import { Message } from 'models/Message';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

const deleteMessage = async (messageId: string) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('No user found');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('No message found');
  }

  await message.deleteOne();
  revalidatePath('/', 'layout');
};

export default deleteMessage;
