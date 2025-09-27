const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');

// Create customer
router.post('/', auth, async (req, res) => {
  try {
    const c = new Customer({ ...req.body, owner: req.user.id });
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).send('Server error'); }
});

// Read customers (paginated simple)
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ owner: req.user.id }).sort('-createdAt');
    res.json(customers);
  } catch (err) { res.status(500).send('Server error'); }
});

// Get single
router.get('/:id', auth, async (req, res) => {
  try {
    const c = await Customer.findById(req.params.id);
    if (!c) return res.status(404).json({ msg: 'Not found' });
    res.json(c);
  } catch (err) { res.status(500).send('Server error'); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const c = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) { res.status(500).send('Server error'); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
