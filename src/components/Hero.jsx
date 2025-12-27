import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [scaleClass, setScaleClass] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile video
        setVideoSrc("https://www.youtube.com/embed/x_0STkp-X4M?autoplay=1&mute=1&loop=1&playlist=x_0STkp-X4M&controls=0&showinfo=0&autohide=1");
        // Scale vertical video to cover horizontal space on mobile
        setScaleClass('scale-125');
      } else {
        // Desktop video
        setVideoSrc("https://www.youtube.com/embed/qzX7l1HSCUQ?autoplay=1&mute=1&loop=1&playlist=qzX7l1HSCUQ&controls=0&showinfo=0&autohide=1");
        setScaleClass('scale-150');
      }
    };

    handleResize(); // Set initial video on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {videoSrc && (
          <iframe
            className={`w-full h-full ${scaleClass}`}
            src={videoSrc}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video background"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      </div>
      <div className="relative z-20 text-white">
        <h1 className="text-6xl md:text-8xl tracking-wider font-heading">
          Fortisworkout
        </h1>
        <p className="mt-4 text-lg md:text-4xl text-gray-300 max-w-2xl">
          Calistenia de alto nivel en Maracaibo
        </p>
        <p className="mt-3 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-heading">
          Entrenamientos al aire libre en la Vereda del Lago para gente que no quiere ser promedio, sino rendir más en cuerpo y mente.
        </p>
        <a
          href="https://wa.me/584227144707" // Reemplaza TUNUMERO con el número de contacto de WhatsApp
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 bg-gray-100 text-black font-bold py-4 px-8 rounded-lg text-xl inline-flex items-center gap-3 hover:bg-gray-300 transition-colors duration-300"
        >
          <FaWhatsapp size={28} />
          Quiero entrenar
        </a>
        <div className="mt-4">
          <Link
            to="/patrocinios"
            className="inline-block mt-3 bg-fortis-gold text-black font-bold py-3 px-6 rounded-md text-lg hover:opacity-95 transition-opacity duration-200"
            aria-label="Soy una marca - Patrocinios"
          >
            Soy una marca
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-gray-400 text-sm">
            Cinco años desafiando la gravedad en Maracaibo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
