'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <Gallery>
      {images.length === 1 ? (
        <Item
          original='https://placekitten.com/1024/768?image=1'
          thumbnail='https://placekitten.com/80/60?image=1'
          width='1024'
          height='768'
        >
          {({ ref, open }) => (
            <Image
              src={images[0]}
              alt='Property image'
              width={0}
              height={0}
              sizes='100%'
              className='h-[400px] w-full object-cover md:mt-10 cursor-pointer'
              ref={ref}
              onClick={open}
            />
          )}
        </Item>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 '>
          {images.map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width='1024'
              height='768'
            >
              {({ ref, open }) => (
                <Image
                  src={image}
                  alt='Property image'
                  width={0}
                  height={0}
                  sizes='100%'
                  loading='eager'
                  ref={ref}
                  onClick={open}
                  className={`h-[450px] w-full object-cover cursor-pointer  rounded-2xl ${images.length === 3 && index === 2 ? 'md:col-span-2' : 'col-span-1'}`}
                />
              )}
            </Item>
          ))}
        </div>
      )}
    </Gallery>
  );
};

export default PropertyImages;
