'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Message } from 'models/Message';
import connectDB from 'config/database';

export const countUnReadMessages = async () => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const message = await Message.countDocuments({
    receiver: session?.user.id,
    read: false,
  });

  return message;
};
