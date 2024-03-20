import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(''); // Lagrar felmeddelanden

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/cart', { params: { userId: 1 } });
        setCart(response.data);
      } catch (err) {
        setError('Det gick inte att hämta kundvagnsdata.');
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div>
      <Typography variant="h5">Kundvagn</Typography>
      {error && <p>{error}</p>}
      <ul>
        {cart.map((item) => (
          // Antag att varje 'item' har ett unikt 'id'
          <li key={item.id}>
            {item.name} - Antal: {item.quantity} - Pris: {item.price}
          </li>
        ))}
      </ul>
      <Typography variant="h6">
        Totalbelopp: {
          cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
        }
      </Typography>
    </div>
  );
};

export default Cart;
