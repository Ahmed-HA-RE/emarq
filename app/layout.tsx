import '@/globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/navbar-components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Emarq',
  description:
    'Discover premium properties across the Emirates with Emarq. Your trusted destination for buying, selling, and renting homes in the UAE.',
};

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar session={session} />
        <main>{children}</main>
        <Footer />
        <Toaster position='top-right' />
      </body>
    </html>
  );
};

export default MainLayout;
