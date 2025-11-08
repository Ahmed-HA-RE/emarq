'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Message } from 'models/Message';
import connectDB from 'config/database';
import type { TMessage } from 'type';

export const sendMessage = async (data: TMessage) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('You must be logged in to be able to send messages');
  }

  const receiver = data.reciver;

  if (session.user.id.toString() === receiver) {
    throw new Error("You can't send message to yourself");
  }

  await Message.create({
    receiver,
    property: data.property,
    name: session.user.name,
    email: session.user.email,
    phone: data.phone,
    body: data.message,
  });
};
