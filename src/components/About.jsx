import Carousel from './Carousel';

const About = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-5xl md:text-6xl">¿Qué es Fortis Workout?</h2>
          <p className="mt-5 text-stone-300 text-lg md:text-xl leading-relaxed">
            Somos un club de calistenia y street workout en Maracaibo. Desde hace 5 años entrenamos al aire libre en las barras del Parque Vereda del Lago: fuerza, control corporal y constancia.
          </p>
        </div>
        <Carousel />
      </div>
    </section>
  );
};

export default About;
