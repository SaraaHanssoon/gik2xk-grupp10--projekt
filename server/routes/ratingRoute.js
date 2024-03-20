// FIL: ratingRoute.js
const express = require('express');
const router = express.Router();
const { Rating } = require('../models');

router.post('/', async (req, res) => {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
