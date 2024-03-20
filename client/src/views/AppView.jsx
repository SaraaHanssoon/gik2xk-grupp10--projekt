import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import AdminForm from './AdminForm';

function AppView() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/admin" component={AdminForm} />
      </Switch>
    </Router>
  );
};

export default AppView;