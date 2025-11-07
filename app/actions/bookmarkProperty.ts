'use server';
import connectDB from 'config/database';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { updateUser } from './auth';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

const bookmarkProperty = async (propertyId: string) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error(
      'You need to be logged in in order to bookmark this property'
    );
  }

  let isBookMarked = session.user.bookmarks.includes(propertyId);
  let message;

  if (isBookMarked) {
    await updateUser(
      session.user.bookmarks.filter((bookmark) => bookmark !== propertyId)
    );
    message = 'Bookmark Removed';
    isBookMarked = false;
  } else {
    const bookmarksProperties = [
      ...session.user.bookmarks,
      new mongoose.Types.ObjectId(propertyId),
    ];
    message = 'Bookmark Added';
    isBookMarked = true;
    await updateUser(bookmarksProperties);
  }

  revalidatePath('/properties/saved', 'page');
  return { message, isBookMarked };
};

export default bookmarkProperty;
