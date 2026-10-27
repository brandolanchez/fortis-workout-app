import { useState, useEffect } from 'react';
import { FaWhatsapp, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { waLink, WA_MESSAGES, SCHEDULE } from '../config/site';

const VIDEOS = {
  mobile: { src: '/assets/videos/hero-movil.mp4', poster: '/assets/videos/hero-movil-poster.webp' },
  desktop: { src: '/assets/videos/hero-desktop.mp4', poster: '/assets/videos/hero-desktop-poster.webp' },
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);

    // El video se carga después de la página, y no se carga si el usuario
    // tiene activado el ahorro de datos o prefiere menos movimiento.
    const saveData = navigator.connection?.saveData;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let timer;
    if (!saveData && !reducedMotion) {
      // Espera a que el navegador esté libre para no competir con la carga inicial.
      const start = () => {
        timer = setTimeout(() => {
          if ('requestIdleCallback' in window) window.requestIdleCallback(() => setLoadVideo(true), { timeout: 3000 });
          else setLoadVideo(true);
        }, 1500);
      };
      if (document.readyState === 'complete') start();
      else window.addEventListener('load', start, { once: true });
    }

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end font-sans overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Primer cuadro del video: se ve mientras carga, o siempre si el usuario ahorra datos o prefiere menos movimiento */}
        <picture>
          <source media="(max-width: 767px)" srcSet={VIDEOS.mobile.poster} />
          <img
            src={VIDEOS.desktop.poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center md:object-left"
            fetchpriority="high"
          />
        </picture>
        {loadVideo && (
          <video
            key={isMobile ? 'm' : 'd'}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-left"
            src={isMobile ? VIDEOS.mobile.src : VIDEOS.desktop.src}
            poster={isMobile ? VIDEOS.mobile.poster : VIDEOS.desktop.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/55 to-black/10 md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pt-32 pb-14 md:pb-24 text-white">
        <h1 className="font-heading text-[3.75rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[0.88] max-w-4xl [text-wrap:balance]">
          Calistenia en Maracaibo
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-stone-200 max-w-xl leading-snug">
          Entrenamos en grupo en las barras de la Vereda del Lago: fuerza, técnica y control corporal. Si nunca has hecho una dominada, empiezas desde ahí.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <a
            href={waLink(WA_MESSAGES.entrenar)}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-fortis-gold text-black font-bold py-4 px-8 rounded-md text-xl inline-flex items-center gap-3 hover:brightness-110 transition"
          >
            <FaWhatsapp size={26} />
            Quiero entrenar
          </a>
          <Link to="/patrocinios/" className="text-stone-300 hover:text-white underline underline-offset-4 decoration-stone-500">
            ¿Tienes una marca? Patrocina a Fortis
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 grid gap-3 sm:grid-cols-2 max-w-3xl text-stone-300">
          <p>5 años entrenando en la Vereda. Todos los niveles.</p>
          {SCHEDULE && (
            <p className="flex gap-2">
              <FaRegClock className="mt-1 shrink-0 text-fortis-gold" aria-hidden="true" />
              <span>{SCHEDULE}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
