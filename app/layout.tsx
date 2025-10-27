import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emarq',
  description:
    'Discover premium properties across the Emirates with Emarq. Your trusted destination for buying, selling, and renting homes in the UAE.',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
