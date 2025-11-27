import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  carrito: [],
  productos: [],
  ventas: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR_AL_CARRITO':
      const productoExistente = state.carrito.find(item => item.id === action.payload.id);
      if (productoExistente) {
        return {
          ...state,
          carrito: state.carrito.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        carrito: [...state.carrito, { ...action.payload, cantidad: 1 }]
      };

    case 'ELIMINAR_DEL_CARRITO':
      return {
        ...state,
        carrito: state.carrito.filter(item => item.id !== action.payload)
      };

    case 'ACTUALIZAR_CANTIDAD':
      return {
        ...state,
        carrito: state.carrito.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: action.payload.cantidad }
            : item
        )
      };

    case 'LIMPIAR_CARRITO':
      return {
        ...state,
        carrito: []
      };

    case 'SET_PRODUCTOS':
      return {
        ...state,
        productos: action.payload
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
}