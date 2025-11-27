import React, { useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductoForm from '../components/ProductoForm'; // Importación correcta

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  // Cargar productos en tiempo real
  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), (snapshot) => {
      const productosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(productosData);
    });

    return () => unsubscribe();
  }, []);

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'productos', id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const editarProducto = (producto) => {
    setProductoEdit(producto);
    setMostrarForm(true);
  };

  const cancelarEdicion = () => {
    setProductoEdit(null);
    setMostrarForm(false);
  };

  return (
    <div className="inventario">
      <div className="inventario-header">
        <h1>📦 Gestión de Inventario</h1>
        <button 
          onClick={() => setMostrarForm(!mostrarForm)}
          className="btn-primary"
        >
          {mostrarForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
        </button>
      </div>

      {mostrarForm && (
        <ProductoForm 
          productoEdit={productoEdit}
          onCancel={cancelarEdicion}
        />
      )}

      <div className="tabla-inventario">
        <h2>Lista de Productos</h2>
        {productos.length === 0 ? (
          <p className="sin-productos">No hay productos en el inventario.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>C$ {producto.precio}</td>
                  <td className={producto.stock <= 5 ? 'stock-bajo' : ''}>
                    {producto.stock}
                  </td>
                  <td>{producto.categoria}</td>
                  <td className="acciones">
                    <button 
                      onClick={() => editarProducto(producto)}
                      className="btn-editar"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => eliminarProducto(producto.id)}
                      className="btn-eliminar"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventario; // Export default al final