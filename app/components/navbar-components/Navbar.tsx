'use client';
import UserMenu from 'app/components/navbar-components/user-menu';
import { Button } from 'app/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import { BellIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const baseLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
  ];

  const authLinks = isLoggedIn
    ? [{ href: '/properties/add', label: 'Add Property' }]
    : [];

  const navigationLinks = [...baseLinks, ...authLinks];

  return (
    <nav className='px-4 md:px-6 py-2 bg-blue-700 border-b border-b-blue-500'>
      <div className='flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto'>
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {/* Mobile menu trigger */}
          <Popover open={openNav} onOpenChange={setOpenNav}>
            <PopoverTrigger asChild>
              <Button
                className='group size-8 md:hidden cursor-pointer transition duration-300 text-white'
                variant='ghost'
                size='icon'
              >
                <svg
                  className='pointer-events-none'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 12L20 12'
                    className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                  />
                  <path
                    d='M4 12H20'
                    className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='w-72 ml-2 px-2 py-4 md:hidden '
            >
              <ul className='flex-col items-start gap-0 md:gap-2'>
                {navigationLinks.map((link, index) => (
                  <li key={link.label}>
                    <Link
                      onClick={() => setOpenNav(!openNav)}
                      href={link.href}
                      className={cn(
                        'hover:bg-black/90',
                        'hover:text-white',
                        'w-full',
                        'inline-block',
                        'rounded-md',
                        'transition',
                        'duration-200',
                        'text-sm',
                        'p-3',

                        pathname === link.href && 'bg-black text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                    {index !== navigationLinks.length - 1 && (
                      <Separator className='my-1.5 bg-gray-200' />
                    )}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className='flex items-center gap-6'>
            <div
              className={cn(
                'flex',
                'flex-row',
                'items-center',
                'justify-center',
                'gap-2'
              )}
            >
              <Link href='/'>
                <Image
                  className='inline-block'
                  src={logo}
                  alt='logo'
                  width={40}
                />
              </Link>
              <Link
                className='text-2xl text-white font-extrabold mt-0.5'
                href='/'
              >
                Emarq
              </Link>
            </div>
            {/* Navigation menu */}
            <div className='max-md:hidden'>
              <ul className='mt-1 flex flex-row items-center justify-center gap-2'>
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      className={cn(
                        'text-base',
                        'px-3',
                        'py-2',
                        'font-light',
                        'text-white',
                        'hover:bg-black',
                        'hover:text-white',
                        'transition-all',
                        'duration-200',
                        'rounded-md',
                        pathname === link.href && 'bg-black text-white'
                      )}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              className='relative cursor-pointer bg-black/70 hover:bg-black/50  border-0 rounded-full transition'
              aria-label='Notifications'
            >
              <BellIcon size={16} aria-hidden='true' color='#fff' />
              <Badge className='h-5 min-w-5 max-w-8 rounded-full absolute -top-2.5 px-1 tabular-nums text-white -right-2  bg-red-600'>
                2
              </Badge>
            </Button>
            {/* User menu */}
            <UserMenu />
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button asChild className='animate-heartbeat bg-black  text-white'>
              <Link href='/signup'>Sign Up</Link>
            </Button>
            <Button
              asChild
              className='animate-heartbeat bg-blue-500 hover:bg-blue-600 text-white'
            >
              <Link href='/signin'>Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
