const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const Center = require('../models/Center');
const User=require('../models/User');// Ensure Center model is imported
const Donation = require('../models/Donation'); // Ensure Donation model is imported
const { createDonation, getDonations,getCenterDonations } = require('../controllers/donations');

const router = express.Router();

router.post(
  '/',
  [
    auth,
    check('material', 'Material is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    check('centerId', 'Center ID is required').not().isEmpty(),
    check('userId', 'User ID is required').not().isEmpty(),
  ],
  createDonation
);

router.get('/', auth, getDonations);

router.get('/center/:centerId', auth, getCenterDonations);

// Fetch user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router;
