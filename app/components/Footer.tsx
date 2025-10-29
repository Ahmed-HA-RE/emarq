import logo from '@/assets/images/logo.png';
import Link from 'next/link';
import Image from 'next/image';
const links = [
  {
    title: 'Properties',
    href: '/properties',
  },
  {
    title: 'Terms of Service',
    href: '/',
  },
];

const Footer = () => {
  return (
    <footer className='bg-gray-200 p-4 mt-24'>
      <div className='px-6 flex flex-col md:flex-row items-center space-y-5 md:space-y-0 justify-between max-w-6xl mx-auto'>
        <div>
          <Link
            href='/'
            aria-label='go home'
            className='mx-auto block size-fit'
          >
            <Image src={logo} alt='Logo' width={40} height={40} />
          </Link>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm'>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className='text-gray-600 hover:text-primary block duration-200'
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <span className='text-gray-600 block text-center text-sm'>
          {' '}
          © {new Date().getFullYear()} Emarq. All rights reserved
        </span>
      </div>
    </footer>
  );
};
export default Footer;
