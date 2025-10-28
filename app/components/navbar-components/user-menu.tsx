import { LogOutIcon, MapPinHouse, UserCog } from 'lucide-react';

import defaultAvatar from '@/assets/images/profile.png';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Suspense } from 'react';
import Link from 'next/link';

export default function UserMenu() {
  const links = [
    {
      herf: '/profile',
      label: 'My Profile',
      icon: <UserCog size={16} aria-hidden='true' />,
    },
    {
      herf: '/saved-properties',
      label: 'Saved Properties',
      icon: <MapPinHouse size={16} aria-hidden='true' />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-auto p-0 hover:bg-transparent cursor-pointer '
        >
          <Avatar className='w-9 h-9 object-cover'>
            <Suspense fallback={<AvatarFallback>K</AvatarFallback>}>
              <Image
                src={defaultAvatar}
                width={36}
                height={36}
                alt='User-Profile-Image'
              />
            </Suspense>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='truncate text-sm font-medium text-foreground'>
            Ahmed
          </span>
          <span className='truncate text-xs font-normal text-muted-foreground'>
            exmaple@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => (
            <DropdownMenuItem
              className='cursor-pointer focus:bg-black focus:text-white'
              asChild
              key={link.label}
            >
              <Link className='hover:text-white' href={link.herf}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer focus:bg-black focus:text-white'>
          <LogOutIcon size={16} className='' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
