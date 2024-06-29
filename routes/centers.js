const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path to your User model

// Route to fetch centers (users with role 'center')
router.get('/', async (req, res) => {
  try {
    const centers = await User.find({ role: 'center' });
    res.json(centers);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
