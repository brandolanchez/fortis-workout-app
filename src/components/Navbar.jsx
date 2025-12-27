import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Esta función ayuda a resaltar el enlace de la página activa
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-heading text-3xl md:text-4xl'
      : 'text-gray-400 hover:text-white transition-colors duration-200 font-heading text-3xl md:text-4xl';

  const navClass = scrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 font-sans transition-colors duration-300 ${navClass}`}>
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img src="/assets/Img/LOGO-16.png" alt="Fortis Workout Logo" className="h-24 md:h-36 py-2 transition-all duration-300" />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 font-title font-bold text-2xl md:text-3xl">
            {!isBlogPage && <li><NavLink to="/blog" className={linkClass}>Blog</NavLink></li>}
            
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
