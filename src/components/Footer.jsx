import { FaWhatsapp, FaInstagram, FaYoutube, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { waLink, WA_MESSAGES, WHATSAPP_DISPLAY, GOOGLE_PROFILE_URL } from '../config/site';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://www.instagram.com/fortisworkout/', label: 'Instagram' },
    { icon: <FaYoutube />, href: 'https://www.youtube.com/@fortisworkout', label: 'YouTube' },
    { icon: <FaWhatsapp />, href: waLink(), label: 'WhatsApp' },
    { icon: <FaGoogle />, href: GOOGLE_PROFILE_URL, label: 'Fortis Workout en Google' },
  ];

  return (
    <footer className="bg-black text-stone-400 pt-16 pb-24 md:pb-10 px-4 font-sans border-t border-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Información</h3>
            <ul className="space-y-3">
              <li><Link to="/reglamento" className="hover:text-white transition-colors">Reglamento Fortis</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Políticas de privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-white mb-4">Comunidad</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/testimonios" className="hover:text-white transition-colors">Testimonios</Link></li>
              <li><Link to="/patrocinios" className="text-fortis-gold hover:text-white transition-colors">Patrocinar a Fortis</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg text-white mb-4">Contacto</h3>
            <p className="text-sm text-stone-400 mb-4">Escríbenos si quieres entrenar, unirte a la comunidad o hablar de patrocinios.</p>
            <a
              href={waLink(WA_MESSAGES.dudas)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaWhatsapp />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>

          <div>
            <h3 className="font-heading text-lg text-white mb-4">Redes</h3>
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-2xl hover:text-white transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-stone-800 pt-8">
          <p className="text-sm">
            &copy; {year} <span className="font-heading">Fortis Workout</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-stone-400 mt-2">Sitio web diseñado y construido por @B_randombarz.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
