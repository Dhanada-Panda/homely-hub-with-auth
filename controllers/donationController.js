const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
  const { donor, center, item, quantity } = req.body;

  try {
    const newDonation = new Donation({ donor, center, item, quantity });
    await newDonation.save();

    res.status(201).json({ message: 'Donation created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor center', 'name email');
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
