import { useState, useEffect } from 'react';
import img1 from '../../assets/Img/mochuelo/Gemini_Generated_Image_b11qkzb11qkzb11q.jpg';
import img2 from '../../assets/Img/mochuelo/mochuelo 2.jpg';

const images = [img1, img2];

const Mochuelo = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xl text-fortis-gold italic">"El mochuelo es nuestro símbolo porque lucha por sobrevivir en el mismo entorno donde entrenamos: la Vereda del Lago."</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-4xl md:text-5xl mb-4"><span className="text-fortis-gold">La lucha del mochuelo</span></h2>
          <p className="text-xl italic text-gray-400 mb-8">¿Sabías por qué el símbolo de nuestro club es un ave?</p>
          <div className="text-lg text-gray-300 space-y-4">
            <p>El mochuelo de hoyo es un pequeño búho que vive en la Vereda del Lago, de mirada intensa, patas largas y un carácter inquieto, activo principalmente durante el día. Comparte el mismo espacio donde entrenamos, cazando y sobreviviendo en un entorno cada vez más difícil.</p>
            <p>En Maracaibo, este mochuelo enfrenta la pérdida de hábitat por la contaminación y la degradación ambiental del lago y sus alrededores, lo que pone en riesgo su futuro en el parque. Igual que este ave, en Fortis entrenamos para resistir, adaptarnos y seguir adelante a pesar de las condiciones adversas.</p>
            <p>Por eso el mochuelo se convirtió en nuestro símbolo: representa la lucha por mantenerse firme cuando el entorno parece jugar en contra. Al entrenar con Fortis, asumes esa misma batalla: te haces más fuerte, más consciente y más resistente.</p>
          </div>
        </div>
        <div className="relative h-96">
          {images.map((img, index) => (
            <img
              key={img}
              src={img}
              alt="Mochuelo"
              className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${img === img1 ? 'object-top' : 'object-center'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mochuelo;
