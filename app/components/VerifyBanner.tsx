'use client';

import { useState } from 'react';
import { Mail, XIcon } from 'lucide-react';

import { Button } from 'app/components/ui/button';

const VerifyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className='dark bg-red-700 px-4 py-3 text-foreground md:py-2'>
      <div className='flex gap-2 items-center justify-center'>
        <div className='flex grow gap-3 md:items-center md:justify-center'>
          <Mail className='shrink-0 opacity-90' size={16} aria-hidden='true' />
          <div className='flex flex-col justify-between gap-3 md:flex-row items-center'>
            <p className='text-xs md:text-sm'>
              Your email is not verified. Please verify it to access all
              features.
            </p>
          </div>
        </div>
        <Button
          variant='ghost'
          className='-me-2 size-8 hover:bg-transparent'
          onClick={() => setIsVisible(false)}
          aria-label='Close banner'
        >
          <XIcon size={16} aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
};
export default VerifyBanner;
