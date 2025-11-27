import React from 'react';
import { useAppContext } from '../context/AppContext';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Carrito = () => {
  const { state, dispatch } = useAppContext();

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      dispatch({ type: 'ELIMINAR_DEL_CARRITO', payload: id });
    } else {
      dispatch({ type: 'ACTUALIZAR_CANTIDAD', payload: { id, cantidad } });
    }
  };

  const eliminarDelCarrito = (id) => {
    dispatch({ type: 'ELIMINAR_DEL_CARRITO', payload: id });
  };

  const calcularTotal = () => {
    return state.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const realizarVenta = async () => {
    try {
      const venta = {
        productos: state.carrito,
        total: calcularTotal(),
        fecha: new Date(),
        estado: 'completada'
      };

      await addDoc(collection(db, 'ventas'), venta);

      for (const item of state.carrito) {
        const nuevoStock = item.stock - item.cantidad;
        await updateDoc(doc(db, 'productos', item.id), {
          stock: nuevoStock
        });
      }

      dispatch({ type: 'LIMPIAR_CARRITO' });
      alert('Venta realizada exitosamente!');
    } catch (error) {
      console.error('Error al realizar venta:', error);
      alert('Error al realizar la venta');
    }
  };

  if (state.carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h3>El carrito está vacío</h3>
        <p>Agrega productos desde la sección de productos</p>
      </div>
    );
  }

  return (
    <div className="carrito-content">
      {state.carrito.map(item => (
        <div key={item.id} className="carrito-item">
          <div className="item-info">
            <h4>{item.nombre}</h4>
            <p>C$ {item.precio} x {item.cantidad} = C$ {(item.precio * item.cantidad).toFixed(2)}</p>
          </div>
          
          <div className="item-controls">
            <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>
              -
            </button>
            <span>{item.cantidad}</span>
            <button 
              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
              disabled={item.cantidad >= item.stock}
            >
              +
            </button>
            <button 
              onClick={() => eliminarDelCarrito(item.id)}
              className="btn-eliminar"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      <div className="carrito-total">
        <h3>Total: C$ {calcularTotal().toFixed(2)}</h3>
        <button onClick={realizarVenta} className="btn-comprar">
          Realizar Venta
        </button>
      </div>
    </div>
  );
};

export default Carrito;