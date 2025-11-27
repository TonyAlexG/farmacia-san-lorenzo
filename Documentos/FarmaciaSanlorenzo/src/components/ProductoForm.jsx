import React, { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProductoForm = ({ productoEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: productoEdit?.nombre || '',
    precio: productoEdit?.precio || '',
    stock: productoEdit?.stock || '',
    categoria: productoEdit?.categoria || '',
    descripcion: productoEdit?.descripcion || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        fechaCreacion: productoEdit ? productoEdit.fechaCreacion : new Date(),
        activo: true
      };

      if (productoEdit) {
        // Actualizar producto
        await updateDoc(doc(db, 'productos', productoEdit.id), productoData);
        alert('Producto actualizado exitosamente!');
      } else {
        // Crear nuevo producto
        await addDoc(collection(db, 'productos'), productoData);
        alert('Producto agregado exitosamente!');
        
        // Limpiar formulario solo si es nuevo
        setFormData({
          nombre: '',
          precio: '',
          stock: '',
          categoria: '',
          descripcion: ''
        });
      }
      
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert(`Error al guardar el producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      <h3>{productoEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
      
      <div className="form-group">
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Paracetamol 500mg"
          value={formData.nombre}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label>Precio (C$):</label>
        <input
          type="number"
          name="precio"
          placeholder="0.00"
          value={formData.precio}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          placeholder="0"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label>Categoría:</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Medicamentos">Medicamentos</option>
          <option value="Antibióticos">Antibióticos</option>
          <option value="Analgésicos">Analgésicos</option>
          <option value="Vitaminas">Vitaminas y Suplementos</option>
          <option value="Cuidado Personal">Cuidado Personal</option>
          <option value="Primeros Auxilios">Primeros Auxilios</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Descripción (opcional):</label>
        <textarea
          name="descripcion"
          placeholder="Descripción del producto..."
          value={formData.descripcion}
          onChange={handleChange}
          rows="3"
          disabled={loading}
        />
      </div>
      
      <div className="form-buttons">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : (productoEdit ? 'Actualizar' : 'Guardar Producto')}
        </button>
        {productoEdit && (
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductoForm;