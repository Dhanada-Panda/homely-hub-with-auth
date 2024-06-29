const Center = require('../models/Center');
const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
  try {
    const { material, quantity, centerId, userId } = req.body;

    // Validation checks
    if (!material || !quantity || !centerId || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Fetch the center details

    // Create the donation with the centerName
    const donation = new Donation({
      material,
      quantity,
      center: centerId,
      user: userId,
    });

    await donation.save();

    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('center');
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { createDonation, getDonations };
