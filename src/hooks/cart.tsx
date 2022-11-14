import { createContext, useContext, useState } from 'react';
import { CartItem, CartState } from '../types';

interface CartContextData {
  addItemToCart(cartItem: CartItem): void;
  removeItemFromCart(variantId: string): void;
  clearCart(): void;
  increase(cartItem: CartItem): void;
  decrease(cartItem: CartItem): void;
  handleCheckout(): void;
  cartItems: CartItem[];
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartState>(() => {
    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) return { cartItems: JSON.parse(cartItems) };

    return { cartItems: [] } as CartState;
  });

  const addItemToCart = (cartItem: CartItem) => {
    setCart((state) => {
      return { ...state, cartItems: [...state.cartItems, cartItem] };
    });
  };

  const removeItemFromCart = (variantId: string) => {
    setCart((state) => {
      return { ...state, cartItems: state.cartItems.filter((item) => item.variantId !== variantId) };
    });
  };

  const clearCart = () => {};

  const increase = (cartItem: CartItem) => {
    cart.cartItems[cart.cartItems.findIndex((item) => item.variantId === cartItem.variantId)].quantity++;

    setCart((state) => {
      return { ...state, cartItems: cart.cartItems };
    });
  };

  const decrease = (cartItem: CartItem) => {
    cart.cartItems[cart.cartItems.findIndex((item) => item.variantId === cartItem.variantId)].quantity--;

    setCart((state) => {
      return { ...state, cartItems: cart.cartItems };
    });
  };

  const handleCheckout = () => {};

  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        removeItemFromCart,
        clearCart,
        increase,
        decrease,
        handleCheckout,
        cartItems: cart.cartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}
