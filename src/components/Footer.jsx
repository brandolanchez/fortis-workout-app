import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://www.instagram.com/fortisworkout/', label: 'Instagram' },
    { icon: <FaYoutube />, href: 'https://www.youtube.com/@fortisworkout', label: 'YouTube' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/584227144707', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-black text-gray-400 pt-16 pb-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Columna 1: Información */}
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Información</h3>
            <ul className="space-y-3">
              <li><Link to="/reglamento" className="hover:text-white transition-colors">Reglamento Fortis</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Políticas de privacidad</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes (FAQ)</Link></li>
            </ul>
          </div>

          {/* Columna 2: Comunidad */}
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Comunidad</h3>
            <ul className="space-y-3">
              <li><Link to="/patrocinios" className="inline-block bg-fortis-gold text-black font-bold px-3 py-2 rounded hover:opacity-90 transition-opacity">Ver opciones de patrocinio →</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Rápido */}
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Contacto Rápido</h3>
            <p className="text-sm text-gray-400 mb-4">Escríbenos si quieres entrenar, unirte a la comunidad o hablar de patrocinios.</p>
            <a 
              href="https://wa.me/584227144707" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaWhatsapp />
              <span>+58 422-7144707</span>
            </a>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Redes Sociales</h3>
            <div className="flex justify-center md:justify-start gap-5">
              {socialLinks.map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-2xl hover:text-white transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            &copy; {year} <span className="font-heading">Fortisworkout</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Sitio web diseñado y construido por @B_randombarz.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
