import { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { waLink, WA_MESSAGES, SCHEDULE, SCHEDULE_NOTE } from '../config/site';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Parque+Vereda+del+Lago+Maracaibo';

const Location = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="ubicacion" className="bg-black text-white py-16 md:py-24 px-4 font-sans border-t border-stone-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-5xl md:text-6xl">Dónde entrenamos</h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12 md:items-start">
          <div>
            <dl className="divide-y divide-stone-800 border-y border-stone-800">
              <div className="py-5">
                <dt className="flex items-center gap-3 font-heading text-2xl">
                  <FaMapMarkerAlt className="shrink-0 text-fortis-gold" size={20} aria-hidden="true" />
                  Lugar
                </dt>
                <dd className="mt-1 pl-8 text-lg text-stone-300">Barras del Parque Vereda del Lago, diagonal a las gradas.</dd>
              </div>
              <div className="py-5">
                <dt className="flex items-center gap-3 font-heading text-2xl">
                  <FaRegClock className="shrink-0 text-fortis-gold" size={20} aria-hidden="true" />
                  Horario
                </dt>
                <dd className="mt-1 pl-8 text-lg text-stone-300">
                  {SCHEDULE || 'Escríbenos y te enviamos los horarios de esta semana.'}
                </dd>
                {SCHEDULE_NOTE && <dd className="mt-1 pl-8 text-stone-400">{SCHEDULE_NOTE}</dd>}
                <dd className="mt-2 pl-8">
                  <a
                    href={waLink(WA_MESSAGES.precios)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fortis-gold underline underline-offset-4 hover:text-white"
                  >
                    Consulta precios por WhatsApp
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={waLink(WA_MESSAGES.entrenar)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-fortis-gold text-black font-bold py-4 px-8 rounded-md text-xl inline-flex items-center gap-3 hover:brightness-110 transition"
            >
              <FaWhatsapp size={26} />
              Quiero entrenar aquí
            </a>
          </div>

          {/* El mapa de Google se carga solo si la persona lo pide: así no pesa en la carga inicial */}
          <div className="relative rounded-lg overflow-hidden bg-stone-900 h-[360px]">
            {showMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.887265809795!2d-71.6033139851996!3d10.68688499239779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8999146e522fab%3A0x6a68e2f8f742f9a9!2sParque%20Vereda%20del%20Lago!5e0!3m2!1sen!2sve!4v1676861559439!5m2!1sen!2sve"
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del Parque Vereda del Lago"
                className="block"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6">
                <FaMapMarkerAlt className="text-fortis-gold" size={40} aria-hidden="true" />
                <p className="text-lg text-stone-300">Parque Vereda del Lago, Maracaibo</p>
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="rounded-md border border-stone-600 px-5 py-3 font-bold text-white hover:border-fortis-gold hover:text-fortis-gold"
                >
                  Ver mapa
                </button>
              </div>
            )}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-black/85 text-white text-sm font-bold px-3 py-2 rounded-md hover:bg-black"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
