import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function AdminFormView() {
  const [productData, setProductData] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const handleProductSubmit = () => {
    // Send product data to the backend for creation
  };

  return (
    <form>
      <div>
        <TextField
          label="Produktnamn"
          value={productData.title}
          onChange={(e) => setProductData({ ...productData, title: e.target.value })}
        />
      </div>
      <div>
        <TextField
          label="Beskrivning"
          value={productData.body}
          onChange={(e) => setProductData({ ...productData, body: e.target.value })}
        />
      </div>
      <Button onClick={handleProductSubmit} color="primary">
        Lägg till produkt
      </Button>
    </form>
  );
};

export default AdminFormView;