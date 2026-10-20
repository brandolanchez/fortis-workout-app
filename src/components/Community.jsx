import { waLink, WA_MESSAGES } from '../config/site';

const points = [
  {
    title: 'Todos los niveles',
    text: 'Entrena gente que está buscando su primera dominada junto a atletas que trabajan estáticos avanzados.',
  },
  {
    title: 'Progresiones claras',
    text: 'Cada ejercicio tiene pasos previos, así sabes en qué punto estás y qué viene después.',
  },
  {
    title: 'Sin ego',
    text: 'Se corrige la técnica con respeto y se celebra cada avance, por pequeño que sea.',
  },
];

const Community = () => {
  return (
    <section className="bg-fortis-gold text-black py-16 md:py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-heading text-5xl md:text-6xl leading-none">Comunidad y entrenos</h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-md">
            Nuestro gimnasio al aire libre son las barras del Parque Vereda del Lago. La rutina es sencilla: llegar, entrenar fuerte y salir mejor de lo que entraste.
          </p>
          <a
            href={waLink(WA_MESSAGES.dudas)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center px-7 py-4 text-lg font-bold text-white bg-black rounded-md hover:bg-stone-800 transition-colors"
          >
            ¿Tienes preguntas? Escríbenos
          </a>
        </div>

        <ul className="divide-y divide-black/20 border-y border-black/20">
          {points.map((p) => (
            <li key={p.title} className="py-6">
              <h3 className="font-heading text-3xl">{p.title}</h3>
              <p className="mt-2 text-lg text-black/75">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Community;
