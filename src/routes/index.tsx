import React from "react";
import { Switch, Route } from "react-router-dom";

import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <ProductList />
      </Route>
      <Route path="/products" exact>
        <ProductList />
      </Route>
      <Route path="/products/:slug">
        <ProductDetail />
      </Route>
    </Switch>
  );
};

export default Routes;
