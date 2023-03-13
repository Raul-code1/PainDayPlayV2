import { Outlet } from 'react-router-dom';
import { NavBar, Footer } from './';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <h1>Main LAYOUT</h1>
      <Outlet />
      <Footer />
    </>
  );
}
