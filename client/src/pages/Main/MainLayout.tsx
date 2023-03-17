// import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar, Footer, MobileMenu } from './components';

export default function MainLayout() {
  /*   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  function handleToggleMenu(): void {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  } */

  return (
    <>
      <NavBar />
      <MobileMenu />
      <Outlet />
      <Footer />
    </>
  );
}
