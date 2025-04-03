
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from "sonner";

// Type definitions
export interface CartItem {
  product: Product;
  quantity: number;
  variant: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; variant: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variant: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variant: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, variant: string, quantity: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.variant === variant
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update existing item
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        updatedItems = [...state.items, { product, variant, quantity }];
      }

      const total = calculateTotal(updatedItems);
      const itemCount = calculateItemCount(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, variant } = action.payload;
      const updatedItems = state.items.filter(
        item => !(item.product.id === productId && item.variant === variant)
      );

      const total = calculateTotal(updatedItems);
      const itemCount = calculateItemCount(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variant, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { 
          type: 'REMOVE_ITEM', 
          payload: { productId, variant } 
        });
      }

      const updatedItems = state.items.map(item => {
        if (item.product.id === productId && item.variant === variant) {
          return { ...item, quantity };
        }
        return item;
      });

      const total = calculateTotal(updatedItems);
      const itemCount = calculateItemCount(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Helper functions
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, variant: string, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string, variant: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variant } });
  };

  const updateQuantity = (productId: string, variant: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variant, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
