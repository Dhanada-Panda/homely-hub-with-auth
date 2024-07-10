const express = require('express');
const router = express.Router();
const verifyToken=require('../middleware/auth');
const User = require('../models/User'); // Adjust the path to your User model
const UserController = require('../controllers/deleteuser');
// Route to fetch users by role
router.get('/', async (req, res) => {
  try {
    const role = req.query.role;
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
router.delete('/:id', UserController.deleteUser);


// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});
module.exports = router;
