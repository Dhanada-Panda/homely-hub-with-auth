const express = require('express');
const { createDonation, getDonations } = require('../controllers/donations');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
// const donationController=require('../controllers/donationController');
router.post('/donations', verifyToken, createDonation);
router.get('/donations', verifyToken, getDonations);

module.exports = router;
