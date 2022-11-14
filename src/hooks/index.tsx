import React from 'react';
import { CartProvider } from './cart';

const StoreProvider: React.FC = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default StoreProvider;
