import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Snackbar } from '@mui/material';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ title: '', body: '', userId: 1 });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Kunde inte hämta produktinformation', error);
        setMessage('Kunde inte hämta produktinformation');
        setOpen(true);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('/cart/add', { userId: 1, productId: id, quantity: 1 }); // Anta att userId är hårdkodat eller hämtat från session
      setMessage('Produkt tillagd i varukorgen!');
    } catch (error) {
      console.error('Kunde inte lägga till produkten i varukorgen', error);
      setMessage('Kunde inte lägga till produkten i varukorgen.');
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <form>
      <Typography variant="h5">Produktdetaljer</Typography>
      <div>
        <TextField
          fullWidth
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          label="Produktnamn"
          name="title"
          id="title"
          margin="normal"
        />
      </div>
      <div>
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={product.body}
          onChange={(e) => setProduct({ ...product, body: e.target.value })}
          label="Beskrivning"
          name="body"
          id="body"
        />
      </div>
      <Button onClick={handleAddToCart}>Lägg till i kundvagn</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </form>
  );
};

export default ProductDetails;
