const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path to your User model

// Route to fetch users by role
router.get('/', async (req, res) => {
  try {
    const role = req.query.role;
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
