import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type InfoBoxProps = {
  title: string;
  description: string;
  button: {
    bg: string;
    bg_hover: string;
    label: string;
    href: string;
  };
};

const InfoBox = ({ title, description, button }: InfoBoxProps) => {
  return (
    <Card className='border-0 shadow-md bg-gray-100 gap-4'>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription>
          <p className='text-base text-black'>{description}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className='px-5'>
        <Button
          asChild
          className={cn(
            'group',
            'h-10',
            'text-sm',
            ' hover:bg-black/85',
            button.bg,
            button.bg_hover
          )}
        >
          <Link href={button.href}>
            {button.label}
            <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InfoBox;
