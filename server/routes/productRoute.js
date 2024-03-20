const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Använd controller-metoder för routerna
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);

module.exports = router;
