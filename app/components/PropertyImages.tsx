import Image from 'next/image';
const PropertyImages = ({ images }: { images: string[] }) => {
  return images.length === 1 ? (
    <Image
      src={images[0]}
      alt='Property image'
      width={0}
      height={0}
      sizes='100%'
      className='h-[400px] w-full object-cover mt-10'
    />
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 md:mt-10'>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt='Property image'
          width={0}
          height={0}
          sizes='100%'
          loading='eager'
          className={`h-[450px] w-full object-cover  rounded-2xl ${images.length === 3 && index === 2 ? 'md:col-span-2' : 'col-span-1'}`}
        />
      ))}
    </div>
  );
};

export default PropertyImages;
