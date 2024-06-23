const express = require('express');
const { createDonation, getDonations } = require('../controllers/donationController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/donations', verifyToken, createDonation);
router.get('/donations', verifyToken, getDonations);

module.exports = router;
