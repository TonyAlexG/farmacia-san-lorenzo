import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>💊 Farmacia San Lorenzo</h1>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          🏠 Inicio
        </Link>
        <Link 
          to="/ventas" 
          className={location.pathname === '/ventas' ? 'active' : ''}
        >
          💰 Ventas
        </Link>
        <Link 
          to="/inventario" 
          className={location.pathname === '/inventario' ? 'active' : ''}
        >
          📦 Inventario
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;