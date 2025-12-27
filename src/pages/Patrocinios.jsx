import React, { useState, useEffect } from 'react';

const Patrocinios = () => {
  const images = ['/assets/Img/Place/banderin.jpg', '/assets/Img/Place/segunda.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesMerchan = [
    '/assets/Img/merchan/1.png',
    '/assets/Img/merchan/2.png',
    '/assets/Img/merchan/3.png',
    '/assets/Img/merchan/photo_2025-12-25_14-00-06.jpg',
    '/assets/Img/merchan/photo_2025-12-25_14-00-21.jpg',
    '/assets/Img/merchan/photo_2025-12-25_14-00-26.jpg',
  ];
  const [currentMerchanIndex, setCurrentMerchanIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambia la imagen cada 4 segundos

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentMerchanIndex((c) => (c + 1) % imagesMerchan.length);
    }, 4000);
    return () => clearTimeout(t);
  }, [currentMerchanIndex]);

  return (
    <section className="bg-black text-white min-h-screen py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl text-fortis-gold text-center mb-8">Para patrocinadores</h1>

        <div className="prose prose-invert lg:prose-xl text-gray-300 mx-auto space-y-6 text-lg lg:text-xl">
          <p>
            <span className="text-fortis-gold font-bold">Fortis Workout</span> es más que un grupo de personas haciendo ejercicio: es una comunidad de jóvenes y adultos activos, conectados con el deporte urbano, la salud y el espacio público de Maracaibo.
          </p>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">Aliarte con Fortis significa:</h2>
          <ul>
            <li><span className="text-fortis-gold font-bold">Presencia constante</span> en la Vereda del Lago, uno de los puntos más concurridos de la ciudad.</li>
            <img src="/assets/Img/Place/photo_2025-12-25_10-43-16.jpg" alt="Fortis Workout en la Vereda del Lago" className="rounded-lg shadow-lg my-4" />
            <li><span className="text-fortis-gold font-bold">Visibilidad en indumentaria y contenido</span>: camisetas, tank tops, shorts, equipo y contenido digital.</li>
            <div className="relative w-full h-80 md:h-[550px] my-6 overflow-hidden rounded-lg shadow-lg">
              {imagesMerchan.map((src, index) => (
                <img
                  key={`mer-${index}`}
                  src={src}
                  alt={`Merchan ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentMerchanIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <li>
              <span className="text-fortis-gold font-bold">Asociar tu marca a valores</span> de disciplina, resiliencia, comunidad y conciencia ambiental (la lucha del mochuelo y la protección del parque).
              <img src="/assets/Img/nosotros/tirados%20al%20suelo.png" alt="Comunidad Fortis Workout" className="rounded-lg shadow-lg my-4" />
            </li>
          </ul>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">Opciones de colaboración:</h2>
          <ul>
            <li><span className="text-fortis-gold font-bold">Patrocinio de indumentaria</span> de la comunidad.</li>
            <li><span className="text-fortis-gold font-bold">Apoyo a eventos</span>, retos y competencias en el parque.</li>
            <li><span className="text-fortis-gold font-bold">Activaciones de marca</span> en entrenamientos especiales y jornadas deportivas.</li>
          </ul>

          <div className="relative w-full h-80 md:h-[550px] my-6 overflow-hidden rounded-lg shadow-lg">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Evento Fortis ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <a href="https://wa.me/584227144707" target="_blank" rel="noopener noreferrer" className="inline-block bg-fortis-gold text-black font-bold px-6 py-3 rounded-md hover:opacity-90">Quiero patrocinar a Fortis →</a>
            <p className="text-sm text-gray-500 mt-2">(Nos atenderás por WhatsApp)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Patrocinios;
