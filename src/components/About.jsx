import Carousel from './Carousel';

const About = () => {
  return (
    <section className="bg-black text-white py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        
        <Carousel />
        <h2 className="font-heading text-4xl md:text-5xl my-8"><span className="text-fortis-gold">¿Qué es Fortis Workout?</span></h2>
        <p className="mt-1 text-gray-300 text-4xl leading-relaxed">
          Somos un club de calistenia que entrena en las barras del Parque Vereda del Lago en Maracaibo, dedicado a desarrollar fuerza, control corporal y mentalidad de alto rendimiento.
          No se trata solo de hacer dominadas: se trata de forjar disciplina, enfoque y resiliencia en comunidad.
        </p>
      </div>
    </section>
  );
};

export default About;