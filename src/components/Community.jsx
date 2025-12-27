import React, { useEffect, useState } from 'react';
import logo from '../../assets/Img/logo-15.png';

const AnimatedRotator = ({ items = [], className = '' }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let fadeInTimer;
    let visibleTimer;
    let fadeOutTimer;

    const startCycle = () => {
      // start with fade in
      setVisible(true);
      // keep visible
      visibleTimer = setTimeout(() => {
        setVisible(false);
        // after fade out advance index
        fadeOutTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % items.length);
        }, 500); // match fade-out duration
      }, 2200); // visible duration
    };

    // small initial delay so it doesn't jump on mount
    fadeInTimer = setTimeout(startCycle, 150);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(visibleTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [index, items.length]);

  return (
    <div className={`mt-4 ${className}`} aria-live="polite">
      <div className="h-12 md:h-16 flex items-center justify-center">
        <p
          key={index}
          className={`text-xl md:text-2xl text-center text-gray-700 transition-all duration-500 ease-in-out transform ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          {items[index]}
        </p>
      </div>
    </div>
  );
};

const Community = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-heading">
            Comunidad y entrenos
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-2xl text-gray-600 leading-relaxed">
            Nos reunimos en las barras del Parque Vereda del Lago, nuestro gimnasio al aire libre, donde la rutina es sencilla: llegar, entrenar fuerte y salir mejor de lo que entraste.
          </p>
        </div>

        <div className="mt-12 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <div className="max-w-4xl mx-auto">
              <div className="prose-lg text-gray-700">
                <p className="text-3xl font-bold text-center">En la comunidad Fortis encontrarás:</p>
                <AnimatedRotator
                  items={[
                    'Personas de distintos niveles, desde principiantes hasta atletas avanzados.',
                    'Progresiones y objetivos claros para que veas tu evolución con el tiempo.',
                    'Un ambiente de apoyo donde cada logro, por pequeño que sea, se celebra.',
                    'Un ambiente de apoyo, disciplina y respeto, lejos de la competencia tóxica.',
                  ]}
                  className="text-xl"
                />
              </div>
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://wa.me/584227144707?text=¡Hola!%20Tengo%20una%20pregunta%20sobre%20la%20comunidad%20Fortis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white transition-all duration-200 bg-gray-900 rounded-md hover:bg-gray-700"
              >
                ¿Tienes preguntas? Habla con nosotros
              </a>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2">
            <img src={logo} alt="Fortis Logo" className="w-full max-w-xs mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
