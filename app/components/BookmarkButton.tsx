'use client';
import { Button } from './ui/button';
import { FaBookmark } from 'react-icons/fa';
import ScreenSpinner from './ScreenSpinner';
import { destructiveToast, successToast } from '@/utils/toast';
import { TProperty } from 'type';
import bookmarkProperty from '@/actions/bookmarkProperty';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import checkBookmark from '@/actions/checkBookmark';
import { useTransition } from 'react';

const BookmarkButton = ({ property }: { property: TProperty }) => {
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(false);

  const handleBookmark = async () => {
    startTransition(async () => {
      const result = await bookmarkProperty(property._id);
      if (result.success) {
        successToast(result.message);
        setIsBookmarked(result.isBookMarked);
      } else {
        destructiveToast(result.message);
      }
    });
  };

  useEffect(() => {
    const fetchBookmarkedStatus = async () => {
      try {
        const isBookmarked = await checkBookmark(property._id);

        if (isBookmarked) {
          setIsBookmarked(isBookmarked);
        }
      } catch (error: any) {
        destructiveToast(error.message);
      }
    };

    fetchBookmarkedStatus();
  }, [property._id]);

  return (
    <>
      {isPending && <ScreenSpinner />}
      {isBookmarked ? (
        <Button
          size={'lg'}
          className='w-full bg-red-500 hover:bg-red-600 rounded-full font-bold'
          onClick={handleBookmark}
        >
          <AiFillDelete />
          Remove Bookmark
        </Button>
      ) : (
        <Button
          size={'lg'}
          className='w-full bg-blue-500 hover:bg-blue-600 rounded-full font-bold'
          onClick={handleBookmark}
        >
          <FaBookmark />
          Bookmark Property
        </Button>
      )}
    </>
  );
};

export default BookmarkButton;
