import React from 'react';


const Testimonios = () => {
  const testimonials = [
    {
      name: 'Marcelo De Vicente',
      quote: 'Fortis cambió mi forma de entrenar. Aquí encontré una comunidad que me impulsa a ser mejor cada día.',
      avatar: '/assets/Img/perfil/2.jpg',
    },
    {
      name: 'Sebastien Faria',
      quote: 'Lo que más me gusta es el ambiente. No es solo ejercicio, es disciplina, mentoría y un propósito compartido.',
      avatar: '/assets/Img/perfil/1.png',
    },
    {
      name: 'Adrian Ochoa',
      quote: 'Comencé sin experiencia y aquí aprendí técnica real. El progreso es visible y la motivación es constante.',
      avatar: '/assets/Img/perfil/3.png',
    },
    {
      name: 'Edixo Villalobos',
      quote: 'Fortis es más que un grupo de entrenamiento. Es una familia comprometida con la excelencia y el crecimiento.',
      avatar: '/assets/Img/perfil/4.png',
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-heading text-5xl md:text-6xl mb-4">Lo que dice la <span className="text-fortis-gold">comunidad</span></h2>
        <p className="text-lg text-gray-400 mb-12">
          Estos son algunos de los miembros que entrenan hoy en Fortis en la Vereda del Lago.
        </p>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-800 transition-colors duration-300"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className={`w-24 h-24 rounded-full mb-4 border-2 border-fortis-gold object-cover ${
                  testimonial.name === 'Sebastien Faria' ? 'object-top' : ''
                }`}
              />
              <h3 className="font-heading text-lg text-fortis-gold mb-3">{testimonial.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
