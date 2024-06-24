const Center = require('../models/Center');

// Function to get all centers
const getAllCenters = async (req, res) => {
  try {
    const centers = await Center.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching centers' });
  }
};

module.exports = { getAllCenters };
