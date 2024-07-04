const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const Center = require('../models/Center'); // Ensure Center model is imported
const Donation = require('../models/Donation'); // Ensure Donation model is imported
const { createDonation, getDonations } = require('../controllers/donations');

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

router.get('/center/:centerId', auth, async (req, res) => {
  try {
    const centerId = req.params.centerId;
    const center = await Center.findById(centerId);

    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }

    const donations = await Donation.find({ center: centerId }).populate('user', 'name email');
    res.json({ center, donations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
