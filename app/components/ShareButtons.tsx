'use client';

import { TProperty } from 'type';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share';

const ShareButtons = ({ property }: { property: TProperty }) => {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_PROD_APP
      : process.env.NEXT_PUBLIC_DEV_APP;

  const shareURL = `${baseURL}/properties/${property._id}`;

  return (
    <div>
      <h4 className='font-bold text-xl text-center mb-3'>
        Share This Property:{' '}
      </h4>
      <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
        <EmailShareButton
          subject={'Check out this property I found!'}
          body={`Take a look at this listing I think you'll love it: ${shareURL}`}
          url={''}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
        <FacebookShareButton
          hashtag={`#${property.type.replace(/\s+/g, '')}`}
          url={shareURL}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <WhatsappShareButton
          title={`Check out this amazing property I found in ${property.location.state}`}
          url={shareURL}
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <TelegramShareButton
          title={`Check out this amazing property I found in ${property.location.state}`}
          url={shareURL}
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
