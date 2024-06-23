const express = require('express');
const router = express.Router();
const { getUserDonations, createDonation } = require('../controllers/donations');
const { verifyToken } = require('../middleware/auth');

// Route to get user donations
router.get('/user', verifyToken, getUserDonations);

// Route to create a new donation
router.post('/', verifyToken, createDonation);

module.exports = router;
