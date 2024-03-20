import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

function RatingView() {
  const productId = {/* product id */};
  const [rating, setRating] = useState(0);

  const handleRating = () => {
    // Implement rating functionality and update backend
  };

  return (
    <div>
      <Typography variant="subtitle1">Betygsätt denna produkt:</Typography>
      <Button onClick={handleRating} color="primary">
        1 Stjärna
      </Button>
      {/* Add more rating options as needed */}
    </div>
  );
};

export default RatingView;