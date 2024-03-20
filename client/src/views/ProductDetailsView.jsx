import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';

function ProductDetailsView() {
  const { id } = useParams();
  const [product, setProduct] = useState({ title: '', body: '', userId: 1 });

  useEffect(() => {
    // Fetch product details by id from the backend and setProduct
  }, [id]);

  return (
    <form>
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
      <Button onClick={() => onSave(product)}>Lägg till i kundvagn</Button>
    </form>
  );
};

export default ProductDetailsView;