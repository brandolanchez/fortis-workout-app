import { useState, useEffect } from 'react';

const images = [
  { src: '/assets/Img/mochuelo/mochuelo-real.webp', alt: 'Mochuelo de hoyo en la Vereda del Lago', position: 'object-center' },
  { src: '/assets/Img/mochuelo/mochuelo-ilustracion.webp', alt: 'Ilustración del mochuelo, símbolo de Fortis', position: 'object-top' },
];

const Mochuelo = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-16 md:py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="md:order-1">
          <h2 className="font-heading text-5xl md:text-6xl text-fortis-gold">La lucha del mochuelo</h2>
          <p className="mt-2 mb-6 text-lg text-stone-400">Por qué el símbolo de nuestro club es un ave.</p>
          <div className="text-lg text-stone-300 space-y-4 leading-relaxed">
            <p>
              El mochuelo de hoyo es un búho pequeño que vive en la Vereda del Lago, en el mismo espacio donde entrenamos. Tiene patas largas, mirada intensa y, a diferencia de otros búhos, es activo de día.
            </p>
            <p>
              La contaminación y el deterioro del lago le están quitando su hábitat, y su futuro en el parque está en riesgo. Aun así, sigue ahí.
            </p>
            <p>
              Por eso lo elegimos: representa mantenerse firme cuando el entorno juega en contra. Es lo mismo que entrenamos en Fortis.
            </p>
          </div>
        </div>
        <div className="relative h-80 md:h-[30rem] rounded-lg overflow-hidden md:order-2">
          {images.map((img, index) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${img.position} ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mochuelo;
