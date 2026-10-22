import { useEffect, useRef, useState } from 'react';
import { responsive } from '../utils/img';

const slides = [
  { src: '/assets/Img/nosotros/20251216_175133.webp', alt: 'Miembro de Fortis frente al Lago de Maracaibo con la camiseta del club' },
  { src: '/assets/Img/nosotros/20251216_175758.webp', alt: 'Atleta en el aire haciendo un movimiento dinámico en las barras' },
  { src: '/assets/Img/nosotros/20251216_182659.webp', alt: 'Miembros de Fortis sobre las barras de la Vereda del Lago al atardecer' },
  { src: '/assets/Img/nosotros/20251216_203959.webp', alt: 'Parada de manos de noche en la Vereda del Lago' },
  { src: '/assets/Img/nosotros/20251216_180228.webp', alt: 'Parada de manos sobre las paralelas del parque' },
  { src: '/assets/Img/nosotros/20251216_181150.webp', alt: 'Miembros de Fortis en el área de barras al atardecer' },
];

// Carrusel con desplazamiento nativo (sin librerías): se desliza con el dedo,
// tiene puntos de navegación y avanza solo cada 5 segundos si no se está tocando.
const Carousel = () => {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  const paused = useRef(false);

  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = track.current;
    const onScroll = () => setCurrent(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = reduced
      ? null
      : setInterval(() => {
          if (paused.current || document.hidden) return;
          const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % slides.length;
          el.scrollTo({ left: el.clientWidth * next, behavior: 'smooth' });
        }, 5000);

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
    >
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Fotos de la comunidad Fortis; desliza para ver más"
        className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <img
            key={s.src}
            {...responsive(s.src, '(max-width: 1152px) 100vw, 1152px')}
            alt={s.alt}
            width="1600"
            height="900"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full shrink-0 snap-center h-[22rem] md:h-[34rem] object-cover"
          />
        ))}
      </div>
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver foto ${i + 1} de ${slides.length}`}
            aria-current={i === current}
            className="p-2"
          >
            <span className={`block h-2.5 w-2.5 rounded-full ${i === current ? 'bg-fortis-gold' : 'bg-white/60'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
