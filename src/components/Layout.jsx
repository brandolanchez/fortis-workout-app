import { Suspense } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import { waLink, WA_MESSAGES } from '../config/site';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      <main className={isHomePage ? '' : 'pt-24 md:pt-28'}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />

      {/* Botón fijo de WhatsApp solo en móvil */}
      <a
        href={waLink(location.pathname === '/patrocinios' ? WA_MESSAGES.patrocinio : WA_MESSAGES.entrenar)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-fortis-gold text-black shadow-lg shadow-black/50"
      >
        <FaWhatsapp size={28} />
      </a>

      <ScrollRestoration />
    </>
  );
};

export default Layout;
