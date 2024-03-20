const express = require('express');
const router = express.Router();
const CartRow = require('../models/CartProduct');

// Hämta alla CartRows
router.get('/', async (req, res) => {
  try {
    const cartRows = await CartRow.findAll();
    res.json(cartRows);
  } catch (error) {
    console.error('Fel vid hämtning av CartRows:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Skapa en ny CartRow
router.post('/', async (req, res) => {
  try {
    const cartRow = await CartRow.create(req.body);
    res.status(201).json(cartRow);
  } catch (error) {
    console.error('Fel vid skapande av CartRow:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Uppdatera en CartRow med ett specifikt id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await CartRow.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCartRow = await CartRow.findByPk(req.params.id);
      res.json(updatedCartRow);
    } else {
      res.status(404).json({ error: 'CartRow inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av CartRow:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Ta bort en CartRow med ett specifikt id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await CartRow.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("CartRow borttagen");
    } else {
      res.status(404).json({ error: 'CartRow inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av CartRow:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

module.exports = router;
