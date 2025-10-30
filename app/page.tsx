import Hero from './components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import RecentProperties from './components/RecentProperties';
import connectDB from 'config/database';

connectDB();
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <RecentProperties />
    </>
  );
};

export default HomePage;
