const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const Center = require('../models/Center');
const User=require('../models/User');// Ensure Center model is imported
const Donation = require('../models/Donation'); // Ensure Donation model is imported
const { createDonation, getDonations,getCenterDonations,getAllDonations } = require('../controllers/donations');
const UserController = require('../controllers/deleteuser');
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
router.get('/',auth,getAllDonations);

router.delete('/api/users/:id', UserController.deleteUser);
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

router.get('/donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'name email') // Adjust fields as needed
      .populate('center', 'name address'); // Adjust fields as needed
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
