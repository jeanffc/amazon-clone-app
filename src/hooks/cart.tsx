import { createContext, useContext, useState } from 'react';
import { CartItem, CartState } from '../types';
import { sumCartItems } from '../utils';

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
    // TODO: save localStorage
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

  const handleCheckout = async () => {
    const { total } = sumCartItems(cart.cartItems);

    const data = {
      orderItems: cart.cartItems,
      totalPrice: total
    };

    fetch('http://localhost:8080/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('success');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error);
      });
  };

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
