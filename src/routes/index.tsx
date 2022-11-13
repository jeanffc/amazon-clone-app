import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={ProductList} />
      <Route path="/products" exact component={ProductList} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/cart" exact component={Cart} />
    </Switch>
  );
};

export default Routes;
