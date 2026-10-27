import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFoundPage = ({ standalone = false }) => {
  usePageTitle('Página no encontrada', { noindex: true });

  return (
    <section className={`bg-black text-white min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-sans ${standalone ? 'min-h-screen' : ''}`}>
      <p className="font-heading text-fortis-gold text-7xl md:text-8xl">404</p>
      <h1 className="font-heading text-3xl md:text-4xl mt-4">Esta página no existe</h1>
      <p className="text-stone-400 mt-3 max-w-md">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <a href="/" className="mt-8 inline-block bg-fortis-gold text-black font-bold py-3 px-6 rounded-md hover:opacity-90">
        Volver al inicio
      </a>
      {!standalone && (
        <Link to="/blog/" className="mt-4 text-stone-400 hover:text-white underline underline-offset-4">Ir al blog</Link>
      )}
    </section>
  );
};

export default NotFoundPage;
