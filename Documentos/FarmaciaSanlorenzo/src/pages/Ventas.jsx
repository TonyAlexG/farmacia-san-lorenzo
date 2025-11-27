import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'ventas'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ventasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha?.toDate()
      }));
      setVentas(ventasData);
    });

    return () => unsubscribe();
  }, []);

  const calcularTotalVentas = () => {
    return ventas.reduce((total, venta) => total + (venta.total || 0), 0);
  };

  return (
    <div className="ventas-page">
      <div className="page-header">
        <h1>Historial de Ventas</h1>
        <p>Consulta de todas las ventas realizadas</p>
      </div>

      <div className="ventas-stats">
        <div className="stat-card">
          <h3>Total de Ventas</h3>
          <p className="stat-number">{ventas.length}</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos Totales</h3>
          <p className="stat-number">C$ {calcularTotalVentas().toFixed(2)}</p>
        </div>
      </div>

      {ventas.length === 0 ? (
        <div className="sin-ventas">
          <h3>No se han registrado ventas</h3>
          <p>Las ventas realizadas aparecerán aquí</p>
        </div>
      ) : (
        <div className="ventas-list">
          {ventas.map(venta => (
            <div key={venta.id} className="venta-card">
              <div className="venta-header">
                <h4>Venta #{venta.id.slice(-6).toUpperCase()}</h4>
                <span className="venta-fecha">
                  {venta.fecha?.toLocaleDateString('es-NI')} - {venta.fecha?.toLocaleTimeString('es-NI')}
                </span>
              </div>
              
              <div className="venta-productos">
                {venta.productos?.map((producto, index) => (
                  <div key={index} className="producto-venta">
                    <span>{producto.nombre}</span>
                    <span>{producto.cantidad} x C$ {producto.precio?.toFixed(2)}</span>
                    <span>C$ {(producto.cantidad * producto.precio)?.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="venta-total">
                <strong>Total: C$ {venta.total?.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ventas;