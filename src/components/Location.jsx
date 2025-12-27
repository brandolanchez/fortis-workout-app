import { FaWhatsapp } from 'react-icons/fa';

const Location = () => {
  return (
    <section className="bg-black text-white py-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl">Nuestro Punto de Encuentro</h2>
          <div className="mt-8 border-2 border-gray-700 rounded-lg p-8 bg-gray-900 max-w-4xl mx-auto">
              <p className="font-heading text-3xl">Entrenamos en las barras del Parque Vereda del Lago, diagonal a las gradas. Haz clic en el mapa para llegar.</p>
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <a href="https://www.google.com/maps/search/?api=1&query=Parque+Vereda+del+Lago" target="_blank" rel="noopener noreferrer">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.887265809795!2d-71.6033139851996!3d10.68688499239779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8999146e522fab%3A0x6a68e2f8f742f9a9!2sParque%20Vereda%20del%20Lago!5e0!3m2!1sen!2sve!4v1676861559439!5m2!1sen!2sve"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none rounded-lg"
              ></iframe>
            </a>
          </div>
          
          <div className="mt-12">
            <a
              href="https://wa.me/584227144707"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-fortis-gold text-black font-bold py-4 px-8 rounded-lg text-xl inline-flex items-center gap-3 hover:bg-opacity-90 transition-all duration-300"
            >
              <FaWhatsapp size={28} />
              Quiero entrenar aquí
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
