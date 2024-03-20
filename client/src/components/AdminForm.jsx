import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const AdminForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    body: '',
    productId: '', // Antag att detta är ID för den produkt som ska hanteras
  });
  const [message, setMessage] = useState(''); // För att visa feedback till användaren

  const handleProductSubmit = async () => {
    if (!productData.title || !productData.body) {
      setMessage('Titel och beskrivning krävs.');
      return;
    }
    try {
      await axios.post('/products', productData);
      setMessage('Produkt tillagd!');
    } catch (error) {
      console.error('Kunde inte lägga till produkten', error);
      setMessage('Kunde inte lägga till produkten.');
    }
  };

  const handleProductDelete = async () => {
    if (!productData.productId) {
      setMessage('Produkt-ID krävs.');
      return;
    }
    try {
      await axios.delete(`/products/${productData.productId}`);
      setMessage('Produkten har tagits bort!');
    } catch (error) {
      console.error('Kunde inte ta bort produkten', error);
      setMessage('Kunde inte ta bort produkten.');
    }
  };

  return (
    <form>
      <div>
        <TextField
          label="Produkt-ID"
          value={productData.productId}
          onChange={(e) => setProductData({ ...productData, productId: e.target.value })}
        />
      </div>
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
      <Button onClick={handleProductDelete} color="secondary">
        Ta bort produkt
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default AdminForm;
