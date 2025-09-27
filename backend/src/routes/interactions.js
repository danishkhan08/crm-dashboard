const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interaction = require('../models/Interaction');

// Create
router.post('/', auth, async (req, res) => {
  try {
    const i = new Interaction({ ...req.body, user: req.user.id });
    await i.save();
    res.json(i);
  } catch (err) { res.status(500).send('Server error'); }
});

// Get for customer
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    const list = await Interaction.find({ customer: req.params.customerId }).sort('-date');
    res.json(list);
  } catch (err) { res.status(500).send('Server error'); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Interaction.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
