import React, { useState } from 'react';
import { Rating as MuiRating, Typography, Button, Snackbar } from '@mui/material';
import axios from 'axios';

const Rating = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRatingSubmit = async () => {
    try {
      await axios.post(`/products/${productId}/addRating`, { rating });
      setSnackbarMessage('Din betygsättning har sparats!');
    } catch (error) {
      console.error('Kunde inte spara betyget', error);
      setSnackbarMessage('Kunde inte spara betyget.');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1">Betygsätt denna produkt:</Typography>
      <MuiRating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Button onClick={handleRatingSubmit} color="primary">Skicka betyg</Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Rating;
