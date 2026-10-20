import { useState, useEffect } from 'react';
import { waLink, WA_MESSAGES, SPONSOR_STATS } from '../config/site';
import { usePageTitle } from '../hooks/usePageTitle';

const merchImages = [
  { src: '/assets/Img/merchan/merch-1.webp', alt: 'Camiseta negra de Fortis Workout' },
  { src: '/assets/Img/merchan/merch-2.webp', alt: 'Camiseta blanca de Fortis Workout' },
  { src: '/assets/Img/merchan/merch-3.webp', alt: 'Camiseta de Fortis Workout en empaque' },
  { src: '/assets/Img/merchan/photo_2025-12-25_14-00-06.jpg', alt: 'Indumentaria de Fortis Workout' },
  { src: '/assets/Img/merchan/photo_2025-12-25_14-00-21.jpg', alt: 'Indumentaria de Fortis Workout' },
  { src: '/assets/Img/merchan/photo_2025-12-25_14-00-26.jpg', alt: 'Indumentaria de Fortis Workout' },
];

const eventImages = [
  { src: '/assets/Img/Place/banderin.webp', alt: 'Evento de Fortis en el parque' },
  { src: '/assets/Img/Place/segunda.webp', alt: 'Evento de Fortis en la Vereda del Lago' },
];

const Rotator = ({ images, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c + 1) % images.length), interval);
    return () => clearTimeout(t);
  }, [current, images.length, interval]);

  return (
    <div className="relative w-full h-72 md:h-[480px] overflow-hidden rounded-lg">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

const benefits = [
  {
    title: 'Presencia constante',
    text: 'Entrenamos en la Vereda del Lago, uno de los puntos más concurridos de Maracaibo.',
    media: <img src="/assets/Img/Place/photo_2025-12-25_10-43-16.webp" alt="Fortis Workout en la Vereda del Lago" loading="lazy" className="rounded-lg w-full" />,
  },
  {
    title: 'Visibilidad en indumentaria y contenido',
    text: 'Tu marca en camisetas, tank tops, shorts, equipo y en el contenido que publicamos.',
    media: <Rotator images={merchImages} />,
  },
  {
    title: 'Valores que suman a tu marca',
    text: 'Disciplina, resiliencia, comunidad y conciencia ambiental: la lucha del mochuelo y el cuidado del parque.',
    media: <img src="/assets/Img/nosotros/tirados-al-suelo.webp" alt="Comunidad Fortis Workout" loading="lazy" className="rounded-lg w-full" />,
  },
];

const options = [
  { title: 'Patrocinio de indumentaria', text: 'Tu logo en la ropa que usa la comunidad.' },
  { title: 'Apoyo a eventos', text: 'Retos y competencias en el parque con tu marca presente.' },
  { title: 'Activaciones de marca', text: 'Entrenamientos especiales y jornadas deportivas con tu producto.' },
];

const Patrocinios = () => {
  usePageTitle('Patrocinios');

  return (
    <section className="bg-black text-white min-h-screen pt-8 pb-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-5xl md:text-7xl text-fortis-gold">Para patrocinadores</h1>
        <p className="mt-6 text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed">
          <span className="text-fortis-gold font-bold">Fortis Workout</span> es una comunidad de jóvenes y adultos activos, conectados con el deporte urbano, la salud y el espacio público de Maracaibo.
        </p>

        {SPONSOR_STATS.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPONSOR_STATS.map((s) => (
              <div key={s.label} className="rounded-lg border border-stone-800 bg-stone-900 p-5 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-heading text-4xl text-fortis-gold">{s.value}</dd>
                <dd className="mt-1 text-sm text-stone-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <h2 className="mt-16 text-fortis-gold font-heading text-3xl md:text-4xl">Qué gana tu marca</h2>
        <div className="mt-8 space-y-12">
          {benefits.map((b) => (
            <div key={b.title}>
              <h3 className="font-heading text-2xl text-white">{b.title}</h3>
              <p className="mt-2 text-lg text-stone-300">{b.text}</p>
              <div className="mt-5">{b.media}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-fortis-gold font-heading text-3xl md:text-4xl">Formas de colaborar</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {options.map((o) => (
            <div key={o.title} className="rounded-lg border border-stone-800 bg-stone-900 p-6">
              <h3 className="font-heading text-xl text-white">{o.title}</h3>
              <p className="mt-2 text-stone-400">{o.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Rotator images={eventImages} />
        </div>

        <div className="mt-12">
          <a
            href={waLink(WA_MESSAGES.patrocinio)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fortis-gold text-black font-bold px-7 py-4 rounded-md text-lg hover:brightness-110"
          >
            Quiero patrocinar a Fortis
          </a>
          <p className="text-sm text-stone-500 mt-3">Te atenderemos por WhatsApp.</p>
        </div>
      </div>
    </section>
  );
};

export default Patrocinios;
