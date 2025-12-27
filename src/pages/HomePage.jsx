import Hero from '../components/Hero';
import About from '../components/About';
import Mochuelo from '../components/Mochuelo';
import Location from '../components/Location';
import ProductCarousel from '../components/Gallery';
import Community from '../components/Community';
import Testimonios from '../components/Testimonios';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Mochuelo />
      <ProductCarousel />
      <Community />
      <Testimonios />
      <Location />
      <Footer />
    </>
  );
};

export default HomePage;
