import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      {/* El componente Outlet renderizará la página actual (Inicio, Blog, etc.) */}
      <main className={isHomePage ? '' : "pt-[140px] md:pt-[160px]"}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
