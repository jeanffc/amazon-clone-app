import { CartItem } from '../types';

export const sumCartItems = (cartItems: CartItem[]) => {
  let itemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  let total = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0).toFixed(2);

  return { itemCount, total };
};
