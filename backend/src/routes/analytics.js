const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interaction = require('../models/Interaction');

// Simple analytics: interactions per type
router.get('/interactions-by-type', auth, async (req, res) => {
  try {
    const agg = await Interaction.aggregate([
      { $match: { user: require('mongoose').Types.ObjectId(req.user.id) } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    res.json(agg);
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
