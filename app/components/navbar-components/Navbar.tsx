'use client';
import UserMenu from 'app/components/navbar-components/user-menu';
import { Button } from 'app/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from 'app/components/ui/navigation-menu';
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

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/properties/add', label: 'Add Property' },
];

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className='px-4 md:px-6 py-2 bg-blue-700'>
      <div className='flex h-16 items-center justify-between gap-4 max-w-6xl mx-auto'>
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
              className='w-full p-1 md:hidden PopoverContent'
            >
              <ul className='flex-col items-start gap-0 md:gap-2'>
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      onClick={() => setOpenNav(!openNav)}
                      href={link.href}
                      className='hover:bg-black hover:text-white w-full inline-block p-1.5 rounded transition duration-200 text-sm'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          {/* Desktop Logo */}
          <div className='flex items-center gap-6'>
            <div className='flex flex-row items-center justify-center gap-2'>
              <Link className='hidden md:inline-block' href='/'>
                <Image
                  className='inline-block'
                  src={logo}
                  alt='logo'
                  width={40}
                />
              </Link>
              <Link
                className='text-2xl text-white font-extrabold mt-0.5 hidden md:inline-block'
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
                      className='text-base px-3 py-2 font-light text-white hover:bg-black hover:text-white transition-all duration-200 rounded-md'
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
        {/* Mobile logo */}
        <div className='block md:hidden translate-x-1/2'>
          <Link className='md:hidden' href='/'>
            <Image className='' src={logo} alt='logo' width={40} />
          </Link>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            size='icon'
            className='relative cursor-pointer bg-black/70  border-0 rounded-full'
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
      </div>
    </nav>
  );
};

export default Navbar;
