import React from 'react';
import { useAppContext } from '../context/AppContext';

const Producto = ({ producto }) => {
  const { dispatch } = useAppContext();

  const agregarAlCarrito = () => {
    dispatch({
      type: 'AGREGAR_AL_CARRITO',
      payload: producto
    });
  };

  return (
    <div style={{
      border: '5px solid #2c5aa0',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      minWidth: '280px',
      display: 'block',
      visibility: 'visible',
      opacity: '1'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '20px' }}>
        {producto.nombre}
      </h3>
      <p style={{ color: '#2c5aa0', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        C$ {producto.precio}
      </p>
      <p style={{ color: '#27ae60', fontWeight: 'bold', marginBottom: '5px' }}>
        Stock: {producto.stock} unidades
      </p>
      <p style={{ color: '#7f8c8d', marginBottom: '15px', fontStyle: 'italic' }}>
        {producto.categoria}
      </p>
      <button 
        onClick={agregarAlCarrito}
        style={{
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#219653'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
      >
        AGREGAR AL CARRITO
      </button>
    </div>
  );
};

export default Producto;