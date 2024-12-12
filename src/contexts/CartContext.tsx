'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '@/types/auth';
import { Product } from '@/types/product';
import { sampleProducts } from '@/data/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'UPDATE_TOTAL' };

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getProduct: (productId: string) => Product | undefined;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
};

function calculateTotal(items: CartItem[], products: Product[]): number {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (product && product.inStock) {
      return total + (product.price * item.quantity);
    }
    return total;
  }, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = sampleProducts.find(p => p.id === action.payload.productId);
      if (!product || !product.inStock) return state;

      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, sampleProducts),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, sampleProducts),
      };
    }
    case 'UPDATE_QUANTITY': {
      const product = sampleProducts.find(p => p.id === action.payload.productId);
      if (!product || !product.inStock) return state;

      const newItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, sampleProducts),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'UPDATE_TOTAL':
      return {
        ...state,
        total: calculateTotal(state.items, sampleProducts),
      };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items } = JSON.parse(savedCart);
      items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Update total when products change (e.g., when a product becomes out of stock)
  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL' });
  }, [sampleProducts]);

  const addItem = (item: CartItem) => {
    const product = getProduct(item.productId);
    if (product && product.inStock) {
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (product && product.inStock && quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const getProduct = (productId: string) => {
    return sampleProducts.find(p => p.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        getProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 