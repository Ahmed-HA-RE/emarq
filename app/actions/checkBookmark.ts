'use server';
import connectDB from 'config/database';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const checkBookmark = async (propertyId: string) => {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error(
      'You need to be logged in in order to bookmark this property'
    );
  }

  const isBookMarked = session.user.bookmarks.includes(propertyId);
  return isBookMarked;
};

export default checkBookmark;
