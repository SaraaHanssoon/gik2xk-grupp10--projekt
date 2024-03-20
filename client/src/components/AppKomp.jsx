import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline, CircularProgress } from '@mui/material';

const ProductList = lazy(() => import('./ProductList'));
const ProductDetails = lazy(() => import('./ProductDetails'));
const Cart = lazy(() => import('./Cart'));
const AdminForm = lazy(() => import('./AdminForm'));
const Rating = lazy(() => import('./Rating'));
const NotFound = lazy(() => import('./NotFound')); // Anta att du har en NotFound-komponent

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}><CircularProgress /></div>}>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/admin" component={AdminForm} />
          <Route path="/rating" component={Rating} />
          <Route component={NotFound} /> {/* Hanterar alla icke-matchande routes */}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
