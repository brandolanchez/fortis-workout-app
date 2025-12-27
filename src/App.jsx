import Hero from './components/Hero';
import About from './components/About';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Mochuelo from './components/Mochuelo';
import Testimonios from './components/Testimonios';

function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Mochuelo />
      <Gallery />
      <Testimonios />
      <Location />
      <Footer />
    </main>
  )
}

export default App
