import Hero from '../components/Hero';
import About from '../components/About';
import Mochuelo from '../components/Mochuelo';
import Location from '../components/Location';
import Community from '../components/Community';
import Testimonios from '../components/Testimonios';
import { usePageTitle } from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle();

  return (
    <>
      <Hero />
      <About />
      <Community />
      <Testimonios />
      <Mochuelo />
      <Location />
    </>
  );
};

export default HomePage;
