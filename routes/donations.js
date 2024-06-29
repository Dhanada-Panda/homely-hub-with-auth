const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
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

module.exports = router;
