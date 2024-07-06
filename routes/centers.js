const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path to your User model
const Center=require('../models/Center');
// Route to fetch centers (users with role 'center')
router.get('/', async (req, res) => {
  try {
    const centers = await User.find({ role: 'center' });
    res.json(centers);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route to get details of a specific center by ID
router.get('/:centerId', async (req, res) => {
  try {
    const center = await Center.findById(req.params.centerId);
    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.json(center);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;