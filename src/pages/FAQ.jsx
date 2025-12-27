import React from 'react';

const FAQ = () => {
  return (
    <section className="bg-black text-white min-h-screen py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl text-fortis-gold text-center mb-8">Preguntas frecuentes</h1>

        <div className="prose prose-invert lg:prose-xl text-gray-300 mx-auto space-y-6 text-lg lg:text-xl">
          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">¿Necesito experiencia previa?</h2>
          <p>No. Hay progresiones para todos los niveles, desde quien no puede hacer una dominada hasta quien busca estáticos avanzados.</p>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">¿Qué necesito llevar?</h2>
          <p>Ropa cómoda para entrenar, agua y ganas de esforzarte. Si tienes, puedes llevar magnesio o tu propio equipo ligero.</p>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">¿Cuánto cuestan las sesiones?</h2>
          <p>Los detalles de inversión y modalidades se coordinan directamente por WhatsApp para adaptarnos a tus objetivos.</p>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">¿Es seguro entrenar en el parque?</h2>
          <p>Entrenamos en grupo, en un área conocida, y cuidamos la técnica para reducir el riesgo de lesiones.</p>

          <h2 className="text-fortis-gold font-heading text-2xl md:text-3xl">¿Cómo me uno a la comunidad?</h2>
          <p>Escríbenos por WhatsApp, te contamos horarios, modalidad y te agregamos al grupo correspondiente.</p>

          <div className="mt-8 text-center">
            <a
              href="https://wa.me/584227144707"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-fortis-gold text-black font-bold px-6 py-3 rounded-md hover:opacity-90"
            >
              Únete a la comunidad →
            </a>
            <p className="text-sm text-gray-500 mt-2">Te atenderemos por WhatsApp para contarte horarios y cómo empezar.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
