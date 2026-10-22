// PENDIENTE: reemplazar cada cita por una real y concreta del miembro
// (cuánto tiempo lleva y qué logró). Ej: "Llegué sin poder colgarme de la barra. A los 3 meses hice mi primera dominada."
// `achievement` es la etiqueta de logro que aparece sobre la cita; confírmala con cada miembro.
// Si tienes el dato, agrégalo en `since` (ej: 'Entrena desde 2023') y aparecerá bajo el nombre.
const testimonials = [
  {
    name: 'Marcelo De Vicente',
    since: '',
    achievement: 'Más resistencia',
    quote: 'Fortis cambió mi forma de entrenar. Aquí encontré una comunidad que me impulsa a ser mejor cada día.',
    avatar: '/assets/Img/perfil/2.webp',
  },
  {
    name: 'Sebastien Faria',
    since: '',
    achievement: 'Más fuerza',
    quote: 'Lo que más me gusta es el ambiente. No es solo ejercicio, es disciplina, mentoría y un propósito compartido.',
    avatar: '/assets/Img/perfil/1.webp',
    position: 'object-top',
  },
  {
    name: 'Adrian Ochoa',
    since: '',
    achievement: 'Fuerza y técnica desde cero',
    quote: 'Comencé sin experiencia y aquí aprendí técnica real. El progreso es visible y la motivación es constante.',
    avatar: '/assets/Img/perfil/3.webp',
  },
  {
    name: 'Edixo Villalobos',
    since: '',
    achievement: 'Más fuerza y resistencia',
    quote: 'Fortis es más que un grupo de entrenamiento. Es una familia comprometida con la excelencia y el crecimiento.',
    avatar: '/assets/Img/perfil/4.webp',
  },
];

const Testimonios = () => {
  return (
    <section className="bg-black text-white pt-16 md:pt-24 pb-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-5xl md:text-6xl">Lo que dice la comunidad</h2>
        <p className="mt-3 text-lg text-stone-400">Miembros que entrenan hoy en Fortis, en la Vereda del Lago.</p>
      </div>

      {/* En móvil se desliza de lado; en desktop es una grilla de 4 */}
      <div className="mt-10 max-w-6xl mx-auto">
        <div tabIndex={0} role="region" aria-label="Testimonios de miembros; desliza para ver más" className="-mx-4 px-4 scroll-px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible [scrollbar-width:none]">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="snap-start shrink-0 w-[82%] sm:w-[45%] lg:w-auto flex flex-col bg-stone-900 rounded-lg p-6 border-t-2 border-fortis-gold"
            >
              {t.achievement && (
                <span className="self-start text-sm font-bold text-fortis-gold">{t.achievement}</span>
              )}
              <blockquote className="mt-3 text-stone-200 text-base leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                  className={`w-14 h-14 rounded-full object-cover ${t.position || ''}`}
                />
                <span>
                  <span className="font-heading text-xl block leading-tight">{t.name}</span>
                  {t.since && <span className="text-sm text-stone-400">{t.since}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
