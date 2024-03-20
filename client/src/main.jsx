import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blueGrey, deepPurple, teal, red, grey } from '@mui/material/colors';

// Importing views
import App from './views/AppView';
import AdminForm from './views/AdminFormView/';
import ProductList from './views/ProductListView';
import ProductDetails from './views/ProductDetailsView';
import Cart from './views/CartView';
import Rating from './views/RatingView';

// Import global styles
import './index.css';

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f3f3f3', paper: grey[50] },
    primary: { main: deepPurple[300] },
    secondary: { main: blueGrey[500] },
    success: { main: teal['700'] },
    error: { main: red['700'] }
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: 'Satisfy', fontSize: '3.7rem' },
    h2: { fontSize: '2.1rem', marginBottom: '.7em', color: blueGrey[800] },
    h3: { fontSize: '1.6rem' },
    h4: { fontSize: '1.3rem', color: 'rgb(106, 77, 123)' },
    body1: { color: blueGrey[700] },
    body2: { color: blueGrey[800] }
  }
});

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <ProductList /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/admin', element: <AdminForm /> }
    ]
  }
]);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>,
  document.getElementById('root')
);
