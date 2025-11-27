import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const agregarProductosEjemplo = async () => {
  try {
    console.log('🔄 Verificando si ya existen productos...');
    
    // Verificar si ya hay productos
    const snapshot = await getDocs(collection(db, 'productos'));
    
    if (snapshot.size > 0) {
      console.log('✅ Ya existen productos en la base de datos');
      return;
    }

    console.log('📦 Agregando productos de ejemplo...');
    
    const productos = [
      {
        nombre: "Paracetamol 500mg",
        precio: 15.99,
        stock: 25,
        categoria: "Analgésicos",
        descripcion: "Alivio del dolor y fiebre",
        fechaCreacion: new Date()
      },
      {
        nombre: "Amoxicilina 250mg",
        precio: 45.50,
        stock: 12,
        categoria: "Antibióticos", 
        descripcion: "Antibiótico de amplio espectro",
        fechaCreacion: new Date()
      },
      {
        nombre: "Ibuprofeno 400mg",
        precio: 18.25,
        stock: 18,
        categoria: "Analgésicos",
        descripcion: "Antiinflamatorio y analgésico",
        fechaCreacion: new Date()
      },
      {
        nombre: "Vitamina C 1000mg",
        precio: 28.75,
        stock: 30,
        categoria: "Vitaminas y Suplementos",
        descripcion: "Refuerzo del sistema inmunológico",
        fechaCreacion: new Date()
      },
      {
        nombre: "Jabón Antibacterial",
        precio: 8.99,
        stock: 45,
        categoria: "Cuidado Personal",
        descripcion: "Limpieza y protección antibacterial",
        fechaCreacion: new Date()
      },
      {
        nombre: "Curitas",
        precio: 5.50,
        stock: 60,
        categoria: "Primeros Auxilios",
        descripcion: "Protección para heridas menores",
        fechaCreacion: new Date()
      }
    ];

    // Agregar cada producto
    for (const producto of productos) {
      await addDoc(collection(db, 'productos'), producto);
      console.log(`✅ Agregado: ${producto.nombre}`);
    }

    console.log('🎉 Todos los productos agregados correctamente');
    
  } catch (error) {
    console.error('❌ Error agregando productos:', error);
  }
};