const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
  const { material, quantity, type, centerId } = req.body;
  try {
    const donation = new Donation({
      material,
      quantity,
      type,
      centerId,
      userId: req.user.id, // assuming user id is stored in req.user
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation' });
  }
};

const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id }).populate('centerId');
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' });
  }
};

module.exports = { createDonation, getUserDonations };
