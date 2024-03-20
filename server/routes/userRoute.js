const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Hämta alla användare
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Skapa en ny användare
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Fel vid skapande av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Uppdatera en användare med ett specifikt id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Ta bort en användare med ett specifikt id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Användare borttagen");
    } else {
      res.status(404).json({ error: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

module.exports = router;
