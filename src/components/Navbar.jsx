import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const links = [
  { to: '/#ubicacion', label: 'Entrenar', hash: true },
  { to: '/patrocinios/', label: 'Patrocinios' },
  { to: '/blog/', label: 'Blog' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const base = 'font-heading text-lg sm:text-xl md:text-2xl transition-colors duration-200';
  const linkClass = ({ isActive }) => `${base} ${isActive ? 'text-fortis-gold' : 'text-stone-200 hover:text-white'}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-colors duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-sm' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-20 md:h-24 flex justify-between items-center">
        <Link to="/" aria-label="Fortis Workout, inicio">
          <img src="/assets/Img/logo-16-160.webp" alt="Fortis Workout" width="160" height="160" className="h-16 md:h-20 w-auto" />
        </Link>

        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {links.map((l) => (
            <li key={l.to}>
              {l.hash ? (
                <Link to={l.to} className={`${base} text-stone-200 hover:text-white`}>{l.label}</Link>
              ) : (
                <NavLink to={l.to} className={linkClass}>{l.label}</NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
