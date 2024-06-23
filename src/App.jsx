// App.js

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';

function App() {
  const location = useLocation();

  // Verifica se a localização atual é "/" para não mostrar o Navbar
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default App;
