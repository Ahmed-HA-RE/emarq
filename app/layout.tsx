import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Emarq',
  description:
    'Discover premium properties across the Emirates with Emarq. Your trusted destination for buying, selling, and renting homes in the UAE.',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
