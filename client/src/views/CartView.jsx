import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

function CartView() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch user's cart from the backend and setCart
  }, []);

  return (
    <div>
      <Typography variant="h5">Kundvagn</Typography>
      {/* Display cart items and total amount */}
    </div>
  );
};

export default CartView;