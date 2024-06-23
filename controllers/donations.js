const Donation = require('../models/Donation');

// Function to get user donations
const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.userId });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' });
  }
};

// Function to create a new donation
const createDonation = async (req, res) => {
  const { material, quantity, centerId } = req.body;
  try {
    const newDonation = new Donation({
      material,
      quantity,
      centerId,
      userId: req.userId,
      date: new Date()
    });
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation' });
  }
};

module.exports = {
  getUserDonations,
  createDonation
};
