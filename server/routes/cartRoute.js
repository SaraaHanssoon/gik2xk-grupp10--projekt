const express = require('express');
const { Cart, Product } = require('../models'); // Antag att både Cart och Product exporteras från '../models'
const router = express.Router();

// Lägg till produkt i varukorg
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const item = await Cart.findOrCreate({ where: { userId, productId }, defaults: { quantity } });
    if (!item[1]) { // Om produkten redan finns, uppdatera kvantiteten
      item[0].quantity += quantity;
      await item[0].save();
    }
    res.status(201).send('Produkt tillagd i varukorgen');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Hämta alla varukorgar
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    console.error('Fel vid hämtning av varukorgar:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Skapa en ny varukorg
router.post('/', async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    console.error('Fel vid skapande av varukorg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Uppdatera en varukorg med ett specifikt id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Cart.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCart = await Cart.findByPk(req.params.id);
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Varukorg inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av varukorg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Ta bort en varukorg med ett specifikt id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cart.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Varukorg borttagen");
    } else {
      res.status(404).json({ error: 'Varukorg inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av varukorg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

module.exports = router;
