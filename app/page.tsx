import Hero from './components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import RecentProperties from './components/RecentProperties';
import connectDB from 'config/database';
import FeaturedProperties from './components/FeaturedProperties';

connectDB();
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <RecentProperties />
    </>
  );
};

export default HomePage;
