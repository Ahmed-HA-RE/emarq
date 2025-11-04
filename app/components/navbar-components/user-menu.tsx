import { LogOutIcon, MapPinHouse, UserCog } from 'lucide-react';
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
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { signOutUser } from '@/actions/auth';
import { Spinner } from '../ui/spinner';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type Session = typeof auth.$Infer.Session;

export default function UserMenu({ session }: { session: Session }) {
  const [isPending, setIsPending] = useState(false);
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

  const handleSignout = async () => {
    try {
      setIsPending(true);
      const result = await signOutUser();
      toast.success(result.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-400))',
        } as React.CSSProperties,
      });
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    } finally {
      setIsPending(false);
      redirect('/');
    }
  };

  return (
    <>
      {isPending ? (
        <Spinner strokeWidth={1.5} className='size-10 text-white' />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-auto p-0 hover:bg-transparent cursor-pointer '
            >
              <Avatar className='w-9 h-9 object-cover'>
                <Suspense
                  fallback={
                    <AvatarFallback>
                      {session.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  }
                >
                  <Image
                    src={session.user.image || session.user.defaultAvatar}
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
                {session.user.name.slice(0, 13)}
              </span>
              <span className='truncate text-xs font-normal text-muted-foreground'>
                {session.user.email}
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
            <DropdownMenuItem
              onClick={handleSignout}
              className='cursor-pointer focus:bg-black focus:text-white'
            >
              <LogOutIcon size={16} className='' aria-hidden='true' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
