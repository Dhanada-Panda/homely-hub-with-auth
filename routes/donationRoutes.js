const express = require('express');
const { createDonation, getDonations, getCenterDonations } = require('../controllers/donations');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/donations', verifyToken, createDonation);
router.get('/donations', verifyToken, getDonations);
router.get('/donations/center/:centerId', verifyToken, getCenterDonations);

module.exports = router;
