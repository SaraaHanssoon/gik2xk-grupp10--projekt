const { Product } = require('../models');

const ProductController = {
  // GET-metod för att hämta alla produkter
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // POST-metod för att lägga till en ny produkt
  addProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Du kan lägga till fler controller-metoder här efter behov
};

module.exports = ProductController;
