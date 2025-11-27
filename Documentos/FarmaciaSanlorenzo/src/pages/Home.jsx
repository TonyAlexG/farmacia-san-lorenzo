import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAppContext } from '../context/AppContext';
import Producto from '../components/Producto';
import Carrito from '../components/Carrito';
import { agregarProductosEjemplo } from '../utils/agregarProductos';

const Home = () => {
  const { state, dispatch } = useAppContext();
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Agregar productos si no existen
    agregarProductosEjemplo();

    const unsubscribe = onSnapshot(collection(db, 'productos'), (snapshot) => {
      const productosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      dispatch({ type: 'SET_PRODUCTOS', payload: productosData });
      setCargando(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const productosFiltrados = state.productos.filter(producto => {
    const coincideCategoria = !categoriaFiltro || producto.categoria === categoriaFiltro;
    const coincideBusqueda = !busqueda || 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    return coincideCategoria && coincideBusqueda;
  });

  if (cargando) {
    return (
      <div className="home">
        <div className="productos-section">
          <div className="cargando">
            <h2>Cargando productos...</h2>
          </div>
        </div>
        <div className="carrito-section">
          <Carrito />
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="productos-section">
        <div className="productos-header">
          <h1>🏥 Farmacia San Lorenzo</h1>
          <p className="ubicacion">Boaco, Nicaragua</p>
        </div>
        
        <div className="filtros">
          <div className="filtro-group">
            <label htmlFor="categoria">Filtrar por categoría:</label>
            <select 
              id="categoria"
              value={categoriaFiltro} 
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="Analgésicos">Analgésicos</option>
              <option value="Antibióticos">Antibióticos</option>
              <option value="Vitaminas y Suplementos">Vitaminas y Suplementos</option>
              <option value="Cuidado Personal">Cuidado Personal</option>
              <option value="Primeros Auxilios">Primeros Auxilios</option>
            </select>
          </div>
          
          <div className="filtro-group">
            <label htmlFor="busqueda">Buscar producto:</label>
            <input
              id="busqueda"
              type="text"
              placeholder="Escribe el nombre del producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="busqueda-input"
            />
          </div>
        </div>

        <div className="productos-info">
          <h2>Productos Disponibles</h2>
          <span className="contador-productos">
            {productosFiltrados.length} productos
          </span>
        </div>

        <div className="productos-container">
          {productosFiltrados.length === 0 ? (
            <div className="productos-vacio">
              <h3>No se encontraron productos</h3>
            </div>
          ) : (
            <div className="productos-grid">
              {productosFiltrados.map(producto => (
                <Producto key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="carrito-section">
        <Carrito />
      </div>
    </div>
  );
};

export default Home;