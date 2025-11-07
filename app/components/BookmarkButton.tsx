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

const BookmarkButton = ({ property }: { property: TProperty }) => {
  const [pending, setPending] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      setPending(true);
      const { message, isBookMarked } = await bookmarkProperty(property._id);
      successToast(message);
      setIsBookmarked(isBookMarked);
    } catch (error: any) {
      destructiveToast(error.message);
    } finally {
      setPending(false);
    }
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
      {pending && <ScreenSpinner />}
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
